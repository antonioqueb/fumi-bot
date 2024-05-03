require('dotenv').config(); // Asegúrate de que esto esté al principio de tu archivo

const chat = async (prompt) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINIPRO}`;
    const headers = {
        'Content-Type': 'application/json'
    };
    const data = {
        prompt: prompt,  // Ajusta según la estructura esperada por la API
        length: 50  // Ejemplo de otro parámetro que podrías necesitar enviar
    };

    try {
        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return null;
    }
};

module.exports = chat;
