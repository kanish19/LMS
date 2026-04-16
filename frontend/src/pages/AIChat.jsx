import { useState } from "react";
import API from "../api/api";

export default function AIChat() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");

  const askAI = async () => {
    try {
      const res = await API.post("/ai/ask", { prompt });
      setReply(res.data.reply);
    } catch (err) {
      console.error(err);
      setReply("AI failed ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🤖 AI Tutor</h2>

      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask something..."
        style={{ padding: "10px", width: "300px" }}
      />

      <br /><br />

      <button onClick={askAI} style={{ padding: "10px 20px" }}>
        Ask AI 🚀
      </button>

      <p style={{ marginTop: "20px" }}>{reply}</p>
    </div>
  );
}