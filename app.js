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

const flowChinches = addKeyword(EVENTS.ACTION)
    .addAnswer(chinches)



const flowAlacranes = addKeyword(EVENTS.ACTION)
    .addAnswer(alacranes)

const flowMoscas = addKeyword(EVENTS.ACTION)
    .addAnswer(moscas)


const flowMosquitos = addKeyword(EVENTS.ACTION)
    .addAnswer(mosquitos)


const flowRatones = addKeyword(EVENTS.ACTION)
    .addAnswer(ratones)


const flowArañasvn = addKeyword(EVENTS.ACTION)
    .addAnswer(arañas)


const flowPulgas = addKeyword(EVENTS.ACTION)
    .addAnswer(pulgas)


const flowCienpies = addKeyword(EVENTS.ACTION)
    .addAnswer(cienpies)


const flowHormigas = addKeyword(EVENTS.ACTION)
    .addAnswer(hormigas)


const flowGarrapatas = addKeyword(EVENTS.ACTION)
    .addAnswer(garrapatas)



    const flowArañaViolinista = addKeyword(EVENTS.ACTION)
    .addAnswer(arañaviolinista)




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
                return gotoFlow(menuFlow);
            } else {
                await ctxFn.flowDynamic("Escribe *Menu* para continuar")
            }
        })

        const menuFlow = addKeyword("Menu").addAnswer(
            menu,
            { capture: true },
            async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
                const validResponses = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "0"];
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
                        return gotoFlow(flowAlacranes);
                    case "4":
                        return gotoFlow(flowMoscas);
                    case "5":
                        return gotoFlow(flowMosquitos);
                    case "6":
                        return gotoFlow(flowRatones);
                    case "7":
                        return gotoFlow(flowArañasvn);
                    case "8":
                        return gotoFlow(flowPulgas);
                    case "9":
                        return gotoFlow(flowCienpies);
                    case "10":
                        return gotoFlow(flowHormigas);
                    case "11":
                        return gotoFlow(flowGarrapatas);
                    case "12":
                        return gotoFlow(flowArañaViolinista);
                
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
        menuFlow, 
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
        flowHormigas,
        flowGarrapatas,
        flowArañaViolinista
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