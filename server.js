const WebSocket = require('ws');
const Binder = require("./binding.js");

const server = new WebSocket.Server({ port: 50000 })
const wsMap = {}

server.on('connection', webSocket => {
  webSocket.on('message', message => {
    console.log("New msg : " + message);
    if(webSocket.firstMsg == false)
      return;
    webSocket.firstMsg = false;
    let json = JSON.parse(message);
    const id = json.id;
    if (id in wsMap) {
      wsMap[id].bindWith(webSocket)
    }
    else {
      if(json.senderType = "fkboard"){
        wsMap[id] = new Binder(id, webSocket);
        wsMap[id].onClose = () => {
          delete wsMap[id];
        }
      }
      webSocket.send(JSON.stringify({"code": 952}))
    }
  })
})
