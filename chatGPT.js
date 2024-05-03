const { GoogleGenerativeAI } = require("@google/generative-ai");

// Asegúrate de tener configurada tu clave de API como una variable de entorno
const genAI = new GoogleGenerativeAI(process.env.GEMINIPRO);

async function chat(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    console.log('Enviando solicitud con el prompt:', prompt);
    const result = await model.generateContent(prompt);
    return result;  // Retorna el resultado directamente
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return null;  // Retorna null en caso de error
  }
}

module.exports = chat;
