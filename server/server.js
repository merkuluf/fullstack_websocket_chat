import express from 'express';
import http from 'http';
import { initializeWebSocket } from './websocket.js';
import authRouter from './routes/auth.js';
import cors from 'cors'
import dotenv from "dotenv"
import apiRouter from './routes/api.js';

dotenv.config();

const app = express();



const server = http.createServer(app);
const port = 3000;
app.use(cors())
app.use(express.json());
app.use('/auth', authRouter);
app.use('/api', apiRouter)

// Middleware to set headers for all routes
app.use((req, res, next) => {
	// Set headers to allow all origins (CORS example)
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});


// Initialize WebSocket Server using the HTTP server
initializeWebSocket(server);

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export default server;
