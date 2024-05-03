const axios = require('axios');
require('dotenv').config();

const chat = async (prompt) => {
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    const payload = {
        contents: [{
            parts: [{ text: prompt }]
        }]
    };
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GEMINIPRO}` // Asegúrate de que GEMINIPRO está correctamente definida en tu .env
    };

    try {
        const response = await axios.post(url, payload, { headers });
        return response.data;
    } catch (err) {
        console.error("Error al conectar con Gemini:", err);
        return "ERROR";
    }
};

module.exports = chat;
