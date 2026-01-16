import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

const MODEL = "gemini-2.5-flash";
const API_KEY = process.env.GEMINI_API_KEY;

app.post("/api/generate-quiz", async (req, res) => {
    try {
        const { text } = req.body;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        { parts: [{ text: `Create 5 multiple-choice questions from:\n${text}` }] }
                    ],
                    generationConfig: {
                        responseMimeType: "application/json"
                    }
                })
            }
        );

        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "AI request failed" });
    }
});

app.listen(3000, () => {
    console.log("Backend running on http://localhost:3000");
});
