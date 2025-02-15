const { OpenAI } = require('openai');

// OpenAI instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Vercel से API key
});

module.exports = async (req, res) => {
  const query = req.query.query || "Hello!";

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4", // या जो मॉडल आप इस्तेमाल करना चाहते हैं
      messages: [{ role: "user", content: query }],
      max_tokens: 1000,
    });

    res.status(200).json({ 
      reply: completion.choices[0].message.content 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
