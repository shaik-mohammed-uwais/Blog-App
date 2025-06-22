import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend.onrender.com", // ← replace this with your actual frontend deployment URL
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_APIKEY);

app.post("/api/generate-blog", async (req, res) => {
  const { topic } = req.body;
  if (!topic) return res.status(400).json({ error: "Topic is required" });

  try {
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash",
    });

    const prompt = `You are a professional blog writer.

Write a compelling and engaging blog post on the topic: "${topic}".

Requirements:
- Generate a short, catchy blog title (max 50 characters).
- Write a high-quality blog content between 750 and 900 characters.
- Content should be informative, well-structured, and easy to read.
- Maintain a friendly and conversational tone.
- Avoid repetition, fluff, and generic phrases.

Respond strictly in the following format (no extra lines or explanations):
Title: <your title here>
Content: <your blog content here>`;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    const title = response.match(/Title:\s*(.*)/)?.[1]?.trim()?.slice(0, 50);
    const content = response.match(/Content:\s*([\s\S]*)/)?.[1]?.trim()?.slice(0, 900);

    res.json({ title, content });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "Failed to generate blog" });
  }
});

app.listen(port, () => {
  console.log(`✅ Gemini-powered server running on port ${port}`);
});
