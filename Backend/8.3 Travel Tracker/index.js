import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "postgres",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisited() {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

//get homepage

app.get("/", async (req, res) => {
  const countries = await checkVisited();
  res.render("index.ejs", { countries: countries, total: countries.length });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
      const countries = await checkVisited();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added, try again.",
      });
    }
  } catch (err) {
    console.log(err);
    const countries = await checkVisited();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name does not exist, try again.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// app.get("/", async (req, res) => {
//   const result = await db.query("SELECT country_code FROM visited_countries");
//   let countries = [];
//   result.rows.forEach((country) => {
//     countries.push(country.country_code);
//   });
//   console.log(result);
//   console.log(result.rows); //array
//   console.log(countries);
//   res.render("index.ejs", { countries: countries, total: countries.length });
//   //db.end();
// });

//insert new country
// app.post("/add", async (req, res) => {
//   const input = req.body["country"];
//   const result = await db.query(
//     "SELECT country_code FROM countries WHERE country_name = $1",
//     [input]
//   );

//   //$1 is a placeholder which is going to be the input from the user typing in the country
//   //ex France is the input it's going to search our countries table to look for France, find the country code and then store it inside the variable result
//   if (result.rows.length !== 0) {
//     //if countrycode exists
//     const data = result.rows[0];
//     //hold on the data at the first position of the row, and we get the country_code that is inside that piece of data.
//     const countryCode = data.country_code;
//     await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [
//       countryCode,
//     ]);
//     res.redirect("/");
//   }
// });
