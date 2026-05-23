import { useEffect, useState } from "react";
import { config } from "../../../shared/config.ts";

interface NoteData {
  [key: string]: { content: string };
}

function SubjectNotes({
  name,
  noteData,
  setNoteData,
}: {
  name: string;
  noteData: NoteData;
  setNoteData: (d: NoteData) => any;
}) {
  return (
    <div>
      <p>editing {name}</p>
      <textarea
        onChange={(e) => {
          setNoteData({ ...noteData, [name]: { content: e.target.value } });
        }}
        value={noteData[name].content}
      ></textarea>
    </div>
  );
}

export default function Notes() {
  const tabs = [...config.subjectNames];
  const [noteData, setNoteData] = useState(
    Object.fromEntries(tabs.map((tab) => [tab, { content: "" }])),
  );

  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then((json) => setNoteData(json));
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subjectName: activeTab,
          value: noteData[activeTab].content,
        }),
      });
    }, 1_000);

    return () => clearTimeout(timeout);
  }, [noteData]);

  console.log("data", noteData);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <div>
      <ul>
        {tabs.map((tabName) => (
          <li key={tabName} onClick={() => setActiveTab(tabName)}>
            {tabName}
          </li>
        ))}
      </ul>
      <SubjectNotes name={activeTab} {...{ noteData, setNoteData }} />
    </div>
  );
}
