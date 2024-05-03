const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')
require("dotenv").config

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
//const MockAdapter = require('@bot-whatsapp/database/mock')
const MongoAdapter = require('@bot-whatsapp/database/mongo')
const path = require("path")
const fs = require("fs")
const chat = require("./chatGPT")
const { handlerAI } = require("./whisper")

const menuPath = path.join(__dirname, "mensajes", "menu.txt")
const menu = fs.readFileSync(menuPath, "utf8")

// Catalogo de plagas
// 1
const alacranesPath = path.join(__dirname, "mensajes", "alacranes.txt")
const alacranes = fs.readFileSync(alacranesPath, "utf8")
// 2
const arañasPath = path.join(__dirname, "mensajes", "arañas.txt")
const arañas = fs.readFileSync(arañasPath, "utf8")
// 3
const arañaviolinistaPath = path.join(__dirname, "mensajes", "arañaviolinista.txt")
const arañaviolinista = fs.readFileSync(arañaviolinistaPath, "utf8")
// 4
const chinchesPath = path.join(__dirname, "mensajes", "chinches.txt")
const chinches = fs.readFileSync(chinchesPath, "utf8")
// 5
const cienpiesPath = path.join(__dirname, "mensajes", "cienpies.txt")
const cienpies = fs.readFileSync(cienpiesPath, "utf8")
// 6
const cucarachasPath = path.join(__dirname, "mensajes", "cucarachas.txt")
const cucarachas = fs.readFileSync(cucarachasPath, "utf8")
// 7
const garrapatasPath = path.join(__dirname, "mensajes", "garrapatas.txt")
const garrapatas = fs.readFileSync(garrapatasPath, "utf8")
// 8
const hormigasPath = path.join(__dirname, "mensajes", "hormigas.txt")
const hormigas = fs.readFileSync(hormigasPath, "utf8")
// 9
const moscasPath = path.join(__dirname, "mensajes", "moscas.txt")
const moscas = fs.readFileSync(moscasPath, "utf8")
// 10
const mosquitosPath = path.join(__dirname, "mensajes", "mosquitos.txt")
const mosquitos = fs.readFileSync(mosquitosPath, "utf8")
// 11
const pulgasPath = path.join(__dirname, "mensajes", "pulgas.txt")
const pulgas = fs.readFileSync(pulgasPath, "utf8")
// 12
const ratonesPath = path.join(__dirname, "mensajes", "ratones.txt")
const ratones = fs.readFileSync(ratonesPath, "utf8")



const pathConsultas = path.join(__dirname, "mensajes", "promptConsultas.txt")
const promptConsultas = fs.readFileSync(pathConsultas, "utf8")

const flowVoice = addKeyword(EVENTS.VOICE_NOTE).addAnswer("Esta es una nota de voz", null, async (ctx, ctxFn) => {
    const text = await handlerAI(ctx)
    const prompt = promptConsultas
    const consulta = text
    const answer = await chat(prompt, consulta)
    await ctxFn.flowDynamic(answer.content)
})

const flowMenuRest = addKeyword(EVENTS.ACTION)
    .addAnswer('Este es el menu', {
        media: "https://www.ujamaaresort.org/wp-content/uploads/2018/01/Ujamaa-restaurant-menu.pdf"
    })



const flowCucarachas = addKeyword(EVENTS.ACTION)
    .addAnswer(cucarachas)
    .addAnswer('¿En qué *fraccionamiento* y cuál es el *municipio* en el que se  encuentran?')


const flowChinches = addKeyword(EVENTS.ACTION)
    .addAnswer(chinches)
    .addAnswer('¿En qué *fraccionamiento* y cuál es el *municipio* en el que se  encuentran?')




const flowAlacranes = addKeyword(EVENTS.ACTION)
    .addAnswer(alacranes)
    .addAnswer('¿En qué *fraccionamiento* y cuál es el *municipio* en el que se  encuentran?')


const flowMoscas = addKeyword(EVENTS.ACTION)
    .addAnswer(moscas)
    .addAnswer('¿En qué *fraccionamiento* y cuál es el *municipio* en el que se  encuentran?')



const flowMosquitos = addKeyword(EVENTS.ACTION)
    .addAnswer(mosquitos)
    .addAnswer('¿En qué *fraccionamiento* y cuál es el *municipio* en el que se  encuentran?')



const flowRatones = addKeyword(EVENTS.ACTION)
    .addAnswer(ratones)
    .addAnswer('¿En qué *fraccionamiento* y cuál es el *municipio* en el que se  encuentran?')



const flowArañasvn = addKeyword(EVENTS.ACTION)
    .addAnswer(arañas)
    .addAnswer('¿En qué *fraccionamiento* y cuál es el *municipio* en el que se  encuentran?')



const flowPulgas = addKeyword(EVENTS.ACTION)
    .addAnswer(pulgas)
    .addAnswer('¿En qué *fraccionamiento* y cuál es el *municipio* en el que se  encuentran?')


const flowCienpies = addKeyword(EVENTS.ACTION)
    .addAnswer(cienpies)
    .addAnswer('¿En qué *fraccionamiento* y cuál es el *municipio* en el que se  encuentran?')



const flowHormigas = addKeyword(EVENTS.ACTION)
    .addAnswer(hormigas)
    .addAnswer('¿En qué *fraccionamiento* y cuál es el *municipio* en el que se  encuentran?')



const flowGarrapatas = addKeyword(EVENTS.ACTION)
    .addAnswer(garrapatas)
    .addAnswer('¿En qué *fraccionamiento* y cuál es el *municipio* en el que se  encuentran?')




    const flowArañaViolinista = addKeyword(EVENTS.ACTION)
    .addAnswer(arañaviolinista)
    .addAnswer('¿En qué *fraccionamiento* y cuál es el *municipio* en el que se  encuentran?')



// Flujo para Información de Plagas
const flowPlagas = addKeyword(EVENTS.ACTION)
    .addAnswer("Aquí puedes encontrar información sobre las plagas más comunes...") 
    // Agregar más información sobre las plagas o opciones para acceder a información específica
    .addAnswer("¿Deseas información sobre alguna plaga en particular?"); 

// Flujo para Costos de los Servicios
const flowCostos = addKeyword(EVENTS.ACTION)
    .addAnswer("Los costos de nuestros servicios varían según el tipo de plaga y el tamaño del área a tratar.")
    // Agregar más información sobre los costos o opciones para obtener una cotización
    .addAnswer("¿Te gustaría obtener una cotización personalizada?");

// Flujo para Agendar una Cita
const flowCita = addKeyword(EVENTS.ACTION)
    .addAnswer("Para agendar una cita, necesitamos algunos datos...")
    // Agregar preguntas para recopilar información como nombre, teléfono, dirección, etc.
    .addAnswer("¿Cuál es tu nombre y número de teléfono?");

// Flujo para Formas de Pago
const flowPagos = addKeyword(EVENTS.ACTION)
    .addAnswer("Aceptamos diversas formas de pago, incluyendo...")
    // Listar las formas de pago disponibles
    .addAnswer("¿Qué forma de pago prefieres?");

// Flujo para Cuentas para Transferencias
const flowCuentas = addKeyword(EVENTS.ACTION)
    .addAnswer("Puedes realizar transferencias a las siguientes cuentas bancarias...")
    // Listar las cuentas bancarias disponibles
    .addAnswer("¿A qué cuenta deseas realizar la transferencia?");

// Flujo para Hablar con un Ejecutivo
const flowEjecutivo = addKeyword(EVENTS.ACTION)
    .addAnswer("Para hablar con un ejecutivo, puedes llamar al siguiente número...") 
    // Proporcionar el número de teléfono
    .addAnswer("¿Deseas que te conectemos con un ejecutivo ahora?");






const flowConsultas = addKeyword(EVENTS.ACTION)
    .addAnswer('Este es el flow consultas')
    .addAnswer("Hace tu consulta", { capture: true }, async (ctx, ctxFn) => {
        const prompt = promptConsultas
        const consulta = ctx.body
        const answer = await chat(prompt, consulta)
        await ctxFn.flowDynamic(answer.content)
    })


const flowWelcome = addKeyword(EVENTS.WELCOME)
    .addAnswer("Hola qué tal como se encuentran el día de hoy!, soy _*Carlos Moreno*_, estoy a sus órdenes. ¿Con quien tengo el gusto?", {
        delay: 100,
    },
        async (ctx, ctxFn) => {
            if (ctx.body.includes("fumiga")) {
                return gotoFlow(menuFlowFumiga);
            } else {
                await ctxFn.flowDynamic("Escribe *Menu* para continuar")
            }
        })

        const menuFlowFumiga = addKeyword("Fumiga").addAnswer(
            menu,
            { capture: true },
            async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
                const validResponses = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12","13", "14","0"];
                if (!validResponses.includes(ctx.body)) {
                    return fallBack(
                        "Respuesta no válida, por favor selecciona una de las opciones."
                    );
                }
                switch (ctx.body) {
                    case "1":
                        return gotoFlow(flowCucarachas);
                    case "2":
                        return gotoFlow(flowChinches);
                    case "3":
                        return gotoFlow(flowChinches);
                    case "4":
                        return gotoFlow(flowAlacranes);
                    case "5":
                        return gotoFlow(flowMoscas);
                    case "6":
                        return gotoFlow(flowMosquitos);
                    case "7":
                        return gotoFlow(flowRatones);
                    case "8":
                        return gotoFlow(flowArañasvn);
                    case "9":
                        return gotoFlow(flowPulgas);
                    case "10":
                        return gotoFlow(flowCienpies);
                    case "11":
                        return gotoFlow(flowHormigas);
                    case "12":
                        return gotoFlow(flowGarrapatas);
                    case "13":
                        return gotoFlow(flowArañaViolinista);
                    case "14":
                        return gotoFlow(flowConsultas);
                        
                
                    case "0":
                        return await flowDynamic(
                            "Saliendo... Puedes volver a acceder a este menú escribiendo '*Menu*'"
                        );
                }
            }
        );
        

        const menuFlow = addKeyword("menu").addAnswer(
            "**Menú Principal:**\n" +
            "1. Información de las Plagas\n" +
            "2. Costos de los Servicios\n" +
            "3. Agendar una Cita\n" +
            "4. Formas de Pago\n" +
            "5. Cuentas para Transferencias\n" +
            "6. Hablar con un Ejecutivo\n" +
            "0. Salir", 
            { capture: true },
            async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
                const validResponses = ["1", "2", "3", "4", "5", "6", "0"];
                if (!validResponses.includes(ctx.body)) {
                    return fallBack(
                        "Respuesta no válida, por favor selecciona una de las opciones."
                    );
                }
                switch (ctx.body) {
                    case "1":
                        // Aquí deberías reemplazar esto con la acción que desees para "Información de las Plagas"
                        return gotoFlow(flowPlagas); // Ejemplo: si tienes un flujo llamado flowPlagas
                    case "2":
                        // Acción para "Costos de los Servicios"
                        return gotoFlow(flowCostos); // Ejemplo
                    case "3":
                        // Acción para "Agendar una Cita"
                        return gotoFlow(flowCita); // Ejemplo
                    case "4":
                        // Acción para "Formas de Pago"
                        return gotoFlow(flowPagos); // Ejemplo
                    case "5":
                        // Acción para "Cuentas para Transferencias"
                        return gotoFlow(flowCuentas); // Ejemplo
                    case "6":
                        // Acción para "Hablar con un Ejecutivo"
                        return gotoFlow(flowEjecutivo); // Ejemplo
                    case "0":
                        return await flowDynamic(
                            "Saliendo... Puedes volver a acceder a este menú escribiendo '*Menu*'"
                        );
                }
            }
        );
        

const main = async () => {
    const adapterDB = new MongoAdapter({
        dbUri: process.env.MONGO_DB_URI,
        dbName: "YoutubeTest"
    })
    const adapterFlow = createFlow([
        flowWelcome,
        menuFlowFumiga, 
        flowMenuRest, 
        flowConsultas, 
        flowVoice,
        flowAlacranes,
        flowMoscas,
        flowMosquitos,
        flowRatones,
        flowArañasvn,
        flowPulgas,
        flowCienpies,
        flowHormigas, // <-- Nuevo flujo agregado
        flowGarrapatas, // <-- Nuevo flujo agregado
        flowArañaViolinista,
        flowPlagas, // <-- Nuevo flujo agregado
        flowCostos, // <-- Nuevo flujo agregado
        flowCita,   // <-- Nuevo flujo agregado
        flowPagos,  // <-- Nuevo flujo agregado
        flowCuentas // <-- Nuevo flujo agregado
        // ... agrega cualquier otro flujo que necesites
    ]);
    
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()