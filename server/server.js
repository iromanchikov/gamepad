const WebSocket = require('ws')
const port = 8080
const server = new WebSocket.Server({port: port})
let session

const dom = {
    start: true,
    dom: [
        {
            elem: "<div class='block'></div>"
        },
        {
            elem: `
                <div class='gamepad'>
                    <div class='gamepad_left'>
                        <button class='js-left btn btn--round btn--square'>влево</button>
                        <button class='js-right btn btn--round btn--square'>вправо</button>
                    </div>
                    <div class='gamepad_right'>
                        <button class='js-red btn btn--round btn--square btn--red'>красный</button>
                        <button class='js-green btn btn--round btn--square btn--green'>зеленый</button>
                    </div>
                </div>
            `
        }
    ]
}


console.log(`
 ------------------------------
| Сервер запущен на ${port} порту |
 ------------------------------
|        localhost:${port}        |
 ------------------------------
`)

function getRandomArbitrary(min = 10000, max = 99999) {
    return parseInt(Math.random() * (max - min) + min)
}

server.on('connection', ws => {
    ws.send(JSON.stringify({connected: true}))

    ws.on('message', (message) => {
        message = JSON.parse(message)
        switch (message.action) {
            case "connect":
                const ID = session || getRandomArbitrary()
                console.log(`connected first device ${ID}`)
                ws.send(`{"code": ${ID}}`)
                session = ID
                break
            case "phoneOpen":
                server.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(dom))
                    }
                    delete dom.start
                })
                break
            case "left":
                server.clients.forEach(client => {
                    dom.dom[0].elem = "<div class='block left'></div>"
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(dom))
                    }
                })
                break
            case "right":
                server.clients.forEach(client => {
                    dom.dom[0].elem = "<div class='block right'></div>"
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(dom))
                    }
                })
                break
            case "green":
                server.clients.forEach(client => {
                    dom.dom[0].elem = "<div class='block green'></div>"
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(dom))
                    }
                })
                break
            case "red":
                server.clients.forEach(client => {
                    dom.dom[0].elem = "<div class='block red'></div>"
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(dom))
                    }
                })
        }
    })
})