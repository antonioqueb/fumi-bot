

const axios = require('axios');
require('dotenv').config();

const chat = async (prompt) => {
    try {
        const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
            contents: [{
                parts: [{ text: prompt }]
            }]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GEMINIPRO_API}`
            }
        });

        return response.data;
    } catch (err) {
        console.error("Error al conectar con Gemini:", err);
        return "ERROR";
    }
};

module.exports = chat;




























// // chatGPT.js
// const { Configuration, OpenAIApi } = require("openai");
// require("dotenv").config();

// const chat = async (prompt, text) => {
//     try {
//         const configuration = new Configuration({
//             apiKey: process.env.OPENAI_API_KEY,
//         });
//         const openai = new OpenAIApi(configuration);
//         const completion = await openai.createChatCompletion({
//             model: "gpt-3.5-turbo",
//             messages: [
//                 { role: "system", content: prompt },
//                 { role: "user", content: text },
//             ],
//         });
//         return completion.data.choices[0].message;
//     } catch (err) {
//         console.error("Error al conectar con OpenAI:", err);
//         return "ERROR";
//     }
// };

// module.exports = chat;