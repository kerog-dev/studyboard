import express from "express";
import { config } from "../../shared/config.js";

const app = express();
const PORT = 8081;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const noteData = Object.fromEntries(
  [...config.subjectNames].map((subject) => [subject, { content: "" }]),
);

app.get("/api/notes", (req, res) => {
  res.json(noteData);
});

app.post("/api/notes", (req, res) => {
  Object.assign(noteData, req.body);
  res.send("ok!").end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
