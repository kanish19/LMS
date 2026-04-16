const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// 🔑 Initialize AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// 🔥 TEST ROUTE (optional but useful)
router.get("/", (req, res) => {
  res.send("AI route working ✅");
});

// 🤖 AI ASK ROUTE
router.post("/ask", async (req, res) => {
  try {
    const { prompt } = req.body;

    // ✅ Validate input
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // 🔍 Debug logs
    console.log("Prompt:", prompt);
    console.log("API KEY:", process.env.GOOGLE_API_KEY ? "Loaded ✅" : "Missing ❌");

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

    console.log("AI Response:", text);

    res.json({ reply: text });

  } catch (err) {
    // 🔥 SHOW FULL ERROR (VERY IMPORTANT)
    console.error("🔥 REAL AI ERROR:", err);

    res.status(500).json({
      error: err.message || "Unknown error",
    });
  }
});

module.exports = router;