const WebSocket = require('ws');
const Binder = require("./binding.js");

const server = new WebSocket.Server({ port: 50000 })
const wsMap = {}

server.on('connection', webSocket => {
  webSocket.on('message', message => {
    if(webSocket.firstMsg == false)
      return;
    webSocket.firstMsg = false;
    let json = JSON.parse(message);
    const id = json.id;
    if (id in wsMap) {
      wsMap[id].bindWith(webSocket)
      wsMap[id].onClose = () => {
        delete wsMap[id];
      }
    }
    else
      wsMap[id] = new Binder(id, webSocket);
  })
})
