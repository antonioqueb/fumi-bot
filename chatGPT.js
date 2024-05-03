const axios = require('axios');
require('dotenv').config();

const chat = async (prompt) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINIPRO}`;
    const headers = {
        'Content-Type': 'application/json'
    };
    const data = {
        prompt: prompt,
        length: 50  // Asegúrate de que este es el parámetro correcto según la documentación de la API
    };

    try {
        console.log('Enviando solicitud:', data);
        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error.response ? error.response.data : error.message);
        return null;
    }
};

module.exports = chat;
