const axios = require('axios');
require('dotenv').config();

const chat = async (prompt) => {
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GEMINIPRO}`  // Asegúrate de que GEMINI_API_KEY está en tu archivo .env
    };
    const data = {
        contents: [{
            parts: [{ text: prompt }]
        }]
    };

    try {
        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error.response ? error.response.data : error.message);
        return null;
    }
};

module.exports = chat;




