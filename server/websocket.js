import ws from 'ws';
const { Server } = ws;
import { v4 as uuid } from 'uuid';

export function initializeWebSocket(httpServer) {
    const clients = {};
    const messages = [];

    const wss = new Server({ server: httpServer });

    wss.on('connection', (ws) => {
        const id = uuid();
        clients[id] = ws;
        console.log(`New client ${id}`);
        ws.send(JSON.stringify(messages));

        ws.on('message', (rawMessage) => {
            const { name, message, room } = JSON.parse(rawMessage);
            const timestamp = new Date().toISOString(); // Create a timestamp

            // Add the message along with the timestamp
            const messageWithTimestamp = { name, message, timestamp, room };
            messages.push(messageWithTimestamp);
            console.log(messages);

            // Send the message to all clients
            for (const id in clients) {
                clients[id].send(JSON.stringify([messageWithTimestamp]));
            }
        });

        ws.on('close', () => {
            delete clients[id];
            console.log(`Client is closed ${id}`);
        });
    });

    process.on('SIGINT', () => {
        console.log('Closing WS Server...');
        wss.close(() => {
            console.log('WS Server closed');
            process.exit(0); // This ensures the process exits
        });
    });
}
