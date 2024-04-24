import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Hello Midori do do</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>cats are cute</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h3>unicorns are real</h3>");
});

app.listen(port, () => {
  console.log(`You can view this port ${port}`);
});
