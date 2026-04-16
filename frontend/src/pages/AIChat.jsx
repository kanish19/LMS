import { useState } from "react";

export default function AIChat() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");

 const askAI = async () => {
  try {
    const res = await fetch("https://lms-yyu4.onrender.com/api/ai/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    console.log("RESPONSE:", data); // 👈 ADD THIS

    if (!res.ok) {
      setReply(data.error || "Something went wrong");
      return;
    }

    setReply(data.reply || "No response");

  } catch (err) {
    console.error("FULL ERROR:", err); // 👈 IMPORTANT
    setReply("Backend not reachable ❌");
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
        Ask
      </button>

      <p style={{ marginTop: "20px" }}>{reply}</p>
    </div>
  );
}