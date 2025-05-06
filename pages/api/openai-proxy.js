// pages/api/openai-proxy.js
import OpenAI from "openai";

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return res.status(500).json({ error: "Missing OPENAI_API_KEY" });
  }

  // v4 constructor takes { apiKey }
  const openai = new OpenAI({ apiKey: key });

  try {
    // Use the chat completions endpoint
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user",  content: req.body.prompt },
      ],
      max_tokens: 150,
    });

    // Return the assistant’s reply
    return res.status(200).json({ text: response.choices[0].message.content });
  } catch (err) {
    console.error("OpenAI error:", err);
    return res.status(500).json({ error: err.message || "OpenAI request failed" });
  }
}
