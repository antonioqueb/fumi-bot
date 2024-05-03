require('dotenv').config(); // Asegúrate de que esto esté al principio de tu archivo
const axios = require('axios');

const chat = async (prompt) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINIPRO}`;
    const headers = {
        'Content-Type': 'application/json'
    };
    const data = {
        prompt: prompt,
        length: 50
    };

    console.log('Enviando solicitud a la API con los siguientes datos:', data); // Log de la solicitud

    try {
        const response = await axios.post(url, data, { headers });
        console.log('Respuesta de la API:', response.data); // Log de la respuesta
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return null;
    }
};


module.exports = chat;
