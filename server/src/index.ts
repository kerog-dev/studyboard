import express from "express";
import { config } from "../../shared/config.js";

const app = express();
const PORT = 8081;

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/notes", (req, res) => {
  res.json(
    Object.fromEntries(
      [...config.subjectNames].map((subject) => [subject, { content: "" }]),
    ),
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
