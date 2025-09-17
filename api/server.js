import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";
import { MockProducts } from "./mockData.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

const HF_API_KEY = process.env.HF_API_KEY;
const HF_MODEL = "sentence-transformers/all-MiniLM-L6-v2";
const API_AI = `https://router.huggingface.co/hf-inference/models/${HF_MODEL}/pipeline/sentence-similarity`;

async function getSemanticScores(source, targets) {
  const response = await fetch(API_AI, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: {
        source_sentence: source,
        sentences: targets,
      },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Hugging Face API error: ${response.status} ${errText}`);
  }

  const data = await response.json();
  return data; // Array of similarity scores
}

app.post("/search", async (req, res) => {
  const products = MockProducts;

  try {
    const { query } = req.body;

    if (!query || !products || !Array.isArray(products)) {
      return res.status(400).json({ error: "Missing query or products array" });
    }

    const targets = products.map((p) => `${p.name} ${p.description}`);
    const scores = await getSemanticScores(query, targets);

    // assign score to each item by semantic match
    const results = products
      .map((product, index) => ({ ...product, score: scores[index] }))
      .sort((a, b) => b.score - a.score);

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
