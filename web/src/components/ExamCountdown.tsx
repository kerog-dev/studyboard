import { config } from "../../../shared/config.ts";
import "./ExamCountdown.css";

function examStatusClass(msRem: number): string {
  const daysRem = msRem / 1000 / 60 / 60 / 24;
  if (daysRem > 7 * 4 * 2) return "clear";
  if (daysRem > 7 * 4) return "warning";
  return "danger";
}

export default function ExamCountdown() {
  const msRem = config.examDate.getTime() - Date.now();
  return (
    <div className="exam-countdown">
      <div className={"top " + examStatusClass(msRem)}>
        {Math.round(msRem / 1000 / 60 / 60 / 24)}
      </div>
      <div className="bottom">Days until exam</div>
    </div>
  );
}
