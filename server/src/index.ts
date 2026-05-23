import express from "express";
import { DatabaseSync } from "node:sqlite";
import { config } from "../../shared/config.js";
import { askAssistant } from "./assistant.js";

const db = new DatabaseSync("studyboard.db");
db.exec(`
CREATE TABLE IF NOT EXISTS notes (
  subjectName TEXT PRIMARY KEY,
  value TEXT
);
`);

for (const subject of config.subjectNames) {
  db.prepare(
    `INSERT OR IGNORE INTO notes (subjectName, value) VALUES (?, ?)`,
  ).run(subject, "");
}

const app = express();
const PORT = 8081;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const noteQueryStmt = db.prepare("SELECT * FROM notes");
const noteUpdateStmt = db.prepare(
  "UPDATE notes SET value = ? WHERE subjectName = ?",
);

app.get("/api/notes", (req, res) => {
  const result = noteQueryStmt.all();
  res.json(
    Object.fromEntries(
      result.map((entry) => [entry.subjectName, { content: entry.value }]),
    ),
  );
});

app.post("/api/notes", (req, res) => {
  const { subjectName, value } = req.body;
  noteUpdateStmt.run(value, subjectName);
  res.send("ok!");
});

app.get("/api/assistant", async (req, res) => {
  try {
    if (typeof req.query.input !== "string") throw "bad input";
    if (req.query.input === "") {
      res.json({ ok: true, output: "" });
      return;
    }
    res.json({ ok: true, output: await askAssistant(req.query.input) });
  } catch (e) {
    res.json({ ok: false, error: String(e) });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
