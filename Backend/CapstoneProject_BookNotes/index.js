import express, { query } from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "books",
  password: "postgres",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let books = [];

app.get("/", async (req, res) => {
  try {
    //const image = "https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg";
    const result = await db.query("SELECT * FROM books ORDER BY id ASC");
    books = result.rows;
    res.render("index.ejs", {
      listTitle: "Books List",
      listBooks: books,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/add", async (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const isbn = req.body.isbn;

  try {
    await db.query(
      "INSERT INTO books (title,author,isbn) VALUES ($1, $2, $3)",
      [title, author, isbn]
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/edit", async (req, res) => {
  const title = req.body.updatedBookTitle;
  const author = req.body.updatedBookAuthor;
  const isbn = req.body.updatedBookIsbn;
  const id = req.body.updatedBookId;
  try {
    await db.query(
      "UPDATE books SET (title=($1), author=($2), isbn=($3) WHERE id=$5",
      [title, author, isbn, id]
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`You got served on http://localhost:${port}`);
});
