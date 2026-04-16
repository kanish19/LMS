const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// 🔑 Load API Key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

router.post("/ask", async (req, res) => {
  try {
    const { prompt } = req.body;

    // ✅ Validate input
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // ✅ Model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // ✅ Generate response
    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });

    const response = result.response;
    const text = response.text();

    res.json({ reply: text });

  } catch (err) {
    console.error("AI ERROR FULL:", err); // 🔥 IMPORTANT
    res.status(500).json({ error: "AI failed" });
  }
});

module.exports = router;