import express from "express";
import apiRouter from "./routes/api.routes.js";

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});