import express from "express";
import { RESPONSE } from "../utils/responses.js";

const apiRouter = express.Router()

apiRouter.get('/rooms', (req, res) => {
    return res.send({amt: [0, 1]})
});

export default apiRouter;