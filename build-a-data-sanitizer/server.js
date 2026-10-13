import express from "express";
import { join } from "path";
import { inputCleaner, inputValidator } from "./middleware.js";

const app = express();
const publicDir = join(import.meta.dirname, "public");
const formFile = "index.html";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/form");
});

app.get("/form", (req, res) => {
  res.sendFile(join(publicDir, formFile));
});

app.use(express.static(publicDir, { index: false }));

app.post("/submit", inputCleaner, inputValidator, (req, res) => {
  const { username, comment } = req.body;
  res.json({ username, comment });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});