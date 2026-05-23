import "./App.css";
import Assistant from "./components/Assistant.tsx";
import Clock from "./components/Clock.tsx";
import Notes from "./components/Notes.tsx";
import Pomodoro from "./components/Pomodoro.tsx";
import Weather from "./components/Weather.tsx";

function App() {
  return (
    <div className="dashboard">
      <div className="topbar">
        <div className="topbar-left">
          <Clock />
          <Weather />
        </div>
        <div className="topbar-center">
          <Assistant />
        </div>
        <div className="topbar-right"></div>
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
