require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const deepseek = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: 'https://api.deepseek.com'
});

app.post('/generate', async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const completion = await deepseek.chat.completions.create({
            model: 'deepseek-coder',
            messages: [{ role: 'user', content: `Generate code for: ${prompt}` }],
        });

        res.json({ code: completion.choices[0].message.content });
    } catch (error) {
        console.error('Error in /generate:', error);
        res.status(500).json({ error: error.message || 'Failed to generate code' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});