const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// make sure your key is correct
const genAI = new GoogleGenerativeAI(process.env.AQAb8RN6JRwiMmtyu_1cbX17sy7LtmjIxOsa1DD0uivGEMGWzg);

router.post("/ask", async (req, res) => {
  try {
    const { prompt } = req.body || {};

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // ✅ use THIS model (confirmed working)
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest"
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ reply: text });

  } catch (err) {
    console.error("AI ERROR FULL:", err); // 👈 IMPORTANT
    res.status(500).json({ error: "AI failed" });
  }
});

module.exports = router;