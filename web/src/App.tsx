import "./App.css";
import Clock from "./components/Clock.tsx";
import Weather from "./components/Weather.tsx";

function App() {
  return (
    <div className="dashboard">
      <div className="topbar">
        <Clock />
        <Weather />
      </div>
      <div className="middle-area"></div>
      <div className="bottom-area"></div>
    </div>
  );
}

export default App;
