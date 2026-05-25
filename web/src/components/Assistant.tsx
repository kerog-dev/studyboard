import React from "react";
import "./Assistant.css";
import GeminiResponse from "./GeminiResponse.tsx";

async function askAssistant(input: string): Promise<string> {
  const json = await fetch(
    `/api/assistant?input=${encodeURIComponent(input)}`,
    {
      method: "GET",
    },
  ).then((res) => res.json());
  if (json.ok) {
    return json.output;
  } else {
    return "(error) " + json.error;
  }
}

export default function Assistant() {
  const [inputValue, setInputValue] = React.useState("");
  const [outputValue, setOutputValue] = React.useState("");

  return (
    <div className="assistant-container">
      <input
        type="text"
        onChange={(e) => {
          setInputValue(e.target.value);
          setOutputValue("");
        }}
        value={inputValue}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            askAssistant(inputValue).then((output) => setOutputValue(output));
          }
        }}
        placeholder="Ask your assistant..."
      />
      <div
        className="assistant-results"
        style={{ display: outputValue && inputValue ? "block" : "none" }}
      >
        <GeminiResponse text={outputValue} />
      </div>
    </div>
  );
}
