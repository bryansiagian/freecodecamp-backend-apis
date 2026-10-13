import express from "express";
import weatherRouter from "./weather.js";

const app = express();
const PORT = 3000;

app.use("/api/weather", weatherRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Weather Service API!");
});

app.get("/api/info", (req, res) => {
  res.json({ name: "Weather Service API" });
});

app.get("/api/status", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/docs", (req, res) => {
  res.redirect("/api/info");
});

app.get("/api/greet/:name", (req, res) => {
  const { name } = req.params;
  res.json({ message: `Hello, ${name}!` });
});

app.route('/api/data')
  .get((req, res) => {
    res.json({ data: "Sample weather data" });
  })
  .post((req, res) => {
    res.status(201).json({ message: "Data created" });
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});