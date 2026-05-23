import { config } from "../../shared/config.js";

export async function askAssistant(input: string): Promise<string> {
  // TODO: integrate wolfram
  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent",
    {
      method: "POST",
      headers: {
        "x-goog-api-key": config.geminiApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [
            {
              text:
                `You are a study assistant embedded in a personal dashboard. You help with school subjects: ${config.subjectNames.join(", ")}.
              Answer concisely — this is a dashboard widget, not a chat. One to three sentences unless a longer answer is genuinely necessary.
              ` + //You have access to a Wolfram Alpha tool. Use it for any mathematical calculations, equations, unit conversions, physics formulas, or factual numerical queries. Do not attempt math in your head — always use the tool for accuracy.
                `Respond in the same language the user writes in.`,
            },
          ],
        },
        contents: [
          {
            parts: [
              {
                text: input,
              },
            ],
          },
        ],
      }),
    },
  );
  const json = await res.json();
  if (res.status !== 200) {
    return `(gemini ${res.status}) ${json.error.message}`;
  }
  return json.candidates[0].content.parts[0].text;
}
