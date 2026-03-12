const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/chat', async (req, res) => {
    const userInput = req.body.input;
    try {
        const response = await axios.post('https://api.huggingface.co/models/YOUR_MODEL_NAME', {
            inputs: userInput,
        }, {
            headers: {
                'Authorization': `Bearer YOUR_HUGGING_FACE_API_KEY`,
            },
        });
        res.json({ response: response.data });
    } catch (error) {
        console.error('Error connecting to Hugging Face API:', error);
        res.status(500).json({ error: 'Failed to get response from AI model.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});