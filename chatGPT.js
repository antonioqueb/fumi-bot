const { GoogleGenerativeAI } = require("@google/generative-ai");

// Asegúrate de tener configurada tu clave de API como una variable de entorno
const genAI = new GoogleGenerativeAI(process.env.GEMINIPRO);

async function chat(prompt) {
  console.log('Inicializando el modelo generativo...');
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    console.log('Enviando solicitud con el prompt:', prompt);
    const result = await model.generateContent(prompt);
    console.log('Contenido generado con éxito:', result);
    return result;  // Retorna el resultado directamente
  } catch (error) {
    console.error('Error en la solicitud:', error);
    // Posibilidad de loguear más detalles del error
    if (error.response) {
      console.error('Detalles de la respuesta:', error.response.data);
      console.error('Estado de la respuesta:', error.response.status);
    }
    return null;  // Retorna null en caso de error
  }
}

module.exports = chat;
