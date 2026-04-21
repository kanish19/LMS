const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// 🔑 Load API key from environment
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ AI Route
router.post("/ask", async (req, res) => {
  try {
    const { prompt } = req.body;

    // ❌ safety check
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    console.log("Prompt:", prompt);
    console.log(
      "API KEY:",
      process.env.GEMINI_API_KEY ? "Loaded ✅" : "Missing ❌"
    );

    // ✅ CORRECT MODEL
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

    // ✅ Correct request format
    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });

    const response = result.response;

    res.json({
      reply: response.text(),
    });

  } catch (err) {
    console.error("🔥 REAL AI ERROR:", err);

    res.status(500).json({
      error: "AI failed",
      details: err.message,
    });
  }
});

module.exports = router;