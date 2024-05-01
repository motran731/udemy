import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// app.get("/", (req, res) => {
//   res.render("index.ejs");
// });

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://www.dnd5eapi.co/api/classes");
    const data = response.data;
    //console.log(data);

    const classesArray = data.results;
    const randomClasses =
      classesArray[Math.floor(Math.random() * classesArray.length)];
    console.log(randomClasses);

    res.render("index.ejs", { data: data });
  } catch (error) {
    console.error(error.response.data);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`You got served on port ${port}!!`);
});
