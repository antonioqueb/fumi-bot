const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot');
require("dotenv").config();

const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MongoAdapter = require('@bot-whatsapp/database/mongo');
const path = require("path");
const fs = require("fs");

console.log("Cargando mensajes...");

const menuPath = path.join(__dirname, "mensajes", "menu.txt");
const menu = fs.readFileSync(menuPath, "utf8");
console.log("Menú cargado:", menu);


console.log("Mensajes cargados correctamente.");

const flowBienvenida = addKeyword(["Fumiga", "Fumigación"])
    .addAnswer(`Hola qué tal como se encuentran el día de hoy!, soy *Carlos Moreno*, estoy a sus órdenes. ¿Con quién tengo el gusto? ¿Qué tipo de *plaga tienen* o qué insectos o roedores han encontrado?\n${menu}`);


const flowIdentificarPlaga = addKeyword(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"])
    .addAnswer((ctx) => {
        const plagaInfo = {
            "1": "LAS CUCARACHAS\nExisten más de 4,600 especies en el mundo...\n[Continúa con información detallada]",
            "2": "CHINCHES DE CAMA\nLas Chinches solo se alimentan de sangre...\n[Continúa con información detallada]",
            "3": "CHINES & CUCARACHAS\n[Información detallada]",
            "4": "ALACRANES\n[Información detallada]",
            "5": "MOSCAS\n[Información detallada]",
            "6": "MOSQUITOS & ZANCUDOS\n[Información detallada]",
            "7": "RATONES\n[Información detallada]",
            "8": "ARAÑAS VIUDA NEGRA\n[Información detallada]",
            "9": "PULGAS\n[Información detallada]",
            "10": "CIEMPIES\n[Información detallada]",
            "11": "HORMIGAS\n[Información detallada]",
            "12": "GARRAPATAS\n[Información detallada]",
            "13": "ARAÑA VIOLINISTA\n[Información detallada]"
        };
        return plagaInfo[ctx.body] || "No tengo información sobre esa opción, ¿puedo ayudarte con algo más?";
    });

const flowConsultaLugar = addKeyword("fraccionamiento")
    .addAnswer("¿En qué *fraccionamiento* y cuál es el *municipio* en el que se encuentran?", {
        capture: true
    });

const main = async () => {
    const adapterDB = new MongoAdapter({
        dbUri: process.env.MONGO_DB_URI,
        dbName: "alphaqueb_db"
    });
    console.log("Conexión con la base de datos establecida.");

    const adapterFlow = createFlow([flowBienvenida, flowIdentificarPlaga, flowConsultaLugar]);
    const adapterProvider = createProvider(BaileysProvider, {
        onConnected: () => console.log("Proveedor conectado correctamente."),
        onConnectionLost: err => console.error("Conexión con el proveedor perdida:", err)
    });

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
    console.log("Portal QR activo.");
}

main().catch(err => {
    console.error("Error durante la ejecución del bot:", err);
});

