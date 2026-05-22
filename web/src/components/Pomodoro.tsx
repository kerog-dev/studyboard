import { useEffect, useState } from "react";
import "./Pomodoro.css";

const FOCUS_SECS = 25 * 60;
const BREAK_SECS = 5 * 60;
const LONG_BREAK_SECS = 15 * 60;

export default function Pomodoro() {
  const [round, setRound] = useState(1);
  const [isBreak, setIsBreak] = useState(false);
  const [secsRem, setSecsRem] = useState(FOCUS_SECS);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setSecsRem((prev) => prev - 1);
    }, 1_000);
    return () => clearInterval(interval);
  }, [running]);

  function getBreakSecs(round: number) {
    return round % 4 === 0 ? LONG_BREAK_SECS : BREAK_SECS;
  }

  function getTotalSecs(isBreak: boolean, round: number): number {
    return isBreak ? getBreakSecs(round) : FOCUS_SECS;
  }

  useEffect(() => {
    if (secsRem > 0 || !running) return;
    const nextIsBreak = !isBreak;
    if (!nextIsBreak) setRound((round) => round + 1);
    setIsBreak(nextIsBreak);
    setRunning(false);
    setSecsRem(nextIsBreak ? getBreakSecs(round + 1) : FOCUS_SECS);
  }, [secsRem]);

  const circumference = 2 * Math.PI * 45;

  // TODO: sync via server
  return (
    <div>
      <div style={{ height: "90%" }}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          height="100%"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="black"
            strokeWidth={10}
          ></circle>
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={isBreak ? "cyan" : "red"}
            strokeWidth={5}
            strokeDasharray={circumference}
            strokeDashoffset={
              circumference * (1 - secsRem / getTotalSecs(isBreak, round))
            }
            transform="rotate(-90 50 50)"
          ></circle>
          <text
            textAnchor="middle"
            fill="black"
            x="50"
            y="50"
            dominantBaseline="middle"
            fontSize={12}
          >
            <tspan x="50" y="45">
              {isBreak ? "RELAX" : "FOCUS"}
            </tspan>
            <tspan x="50" y="58" fontSize={10}>
              {Math.floor(secsRem / 60)
                .toString()
                .padStart(2, "0")}
              :{(secsRem % 60).toString().padStart(2, "0")}
            </tspan>
            <tspan x="50" y="68" fontSize={10}>
              #{round}
            </tspan>
          </text>
        </svg>
      </div>
      <div style={{ height: "10%" }} className="timer-controls">
        <button onClick={() => setRunning(!running)}>
          {running ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => {
            setRunning(false);
            setSecsRem(isBreak ? getBreakSecs(round) : FOCUS_SECS);
          }}
        >
          Restart
        </button>
        <button onClick={() => setSecsRem(0)}>Skip</button>
      </div>
    </div>
  );
}
