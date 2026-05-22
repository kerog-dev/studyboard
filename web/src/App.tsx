import "./App.css";
import Clock from "./components/Clock.tsx";
import Notes from "./components/Notes.tsx";
import Pomodoro from "./components/Pomodoro.tsx";
import Weather from "./components/Weather.tsx";

function App() {
  return (
    <div className="dashboard">
      <div className="topbar">
        <Clock />
        <Weather />
      </div>
      <div className="middle-area">
        <Pomodoro />
      </div>
      <div className="bottom-area">
        <Notes />
      </div>
    </div>
  );
}

export default App;
