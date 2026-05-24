import { useState } from "react";
import "./Tasklist.css";

export default function Tasklist() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  return (
    <div className="tasklist">
      <ul className="list">
        {tasks.map((task, index) => (
          <li key={index}>
            {task} (
            <button
              onClick={() => setTasks(tasks.filter((_, i) => i !== index))}
            >
              Done
            </button>
            )
          </li>
        ))}
      </ul>
      <input
        className="input"
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setTasks([...tasks, newTask]);
            setNewTask("");
          }
        }}
      />
    </div>
  );
}
