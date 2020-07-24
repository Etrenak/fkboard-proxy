module.exports = class Binder {
    /**
     * @param {String} id 
     * @param {WebSocket} fkboardSocket 
     */
    constructor(id, fkboardSocket) {
        this.id = id;
        this.fkboardSocket = fkboardSocket;
    }

    /**
     * @param {WebSocket} pluginSocket 
     */
    bindWith(pluginSocket) {
        this.pluginSocket = pluginSocket;

        // this.fkboardSocket.send("BINDED");
        // this.pluginSocket.send("BINDED");

        bind(this.fkboardSocket, this.pluginSocket, this);
        bind(this.pluginSocket, this.fkboardSocket, this);
    }

    close(){
        this.onClose();
    }

    onClose(){}
}

/**
* @param {WebSocket} ws0 
* @param {WebSocket} ws1 
*/
function bind(ws0, ws1, binder) {
    ws0.on("message", (msg) => {
        ws1.send(msg);
    })
    ws0.on("close", (code, reason) => {
        if (!ws1.CLOSED) {
            ws1.close(code, reason);
            binder.close();
        }
    });
}