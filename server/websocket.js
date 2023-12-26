import ws from 'ws';
const { Server } = ws;
import { v4 as uuid } from 'uuid';

// This function will be exported and used in the main server file
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
            const { name, message } = JSON.parse(rawMessage);
            messages.push({ name, message });
            console.log(messages)

            for (const id in clients) {
                clients[id].send(JSON.stringify([{ name, message }]));
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
