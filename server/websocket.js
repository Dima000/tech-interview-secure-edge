const http = require('http');
const WebSocketServer = require('websocket').server;

const server = http.createServer();
server.listen(4050);

const wsServer = new WebSocketServer({
    httpServer: server
});

console.log('Web socket server started on port 4050');

wsServer.on('request', function (request) {
    const connection = request.accept(null, request.origin);

    const intervalId = setInterval(() => {
        connection.send(JSON.stringify(getRandomDataPoint()));
    }, 3000);

    connection.on('close', function (reasonCode, description) {
        console.log('Client has disconnected.');
        clearInterval(intervalId);
    });
});

function getRandomDataPoint() {
    return {
        date: Date.now(),
        usd: randomBetween(1, 8),
        eur: randomBetween(1, 10),
        ron: randomBetween(1, 5),
    }
}

function randomBetween(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}
