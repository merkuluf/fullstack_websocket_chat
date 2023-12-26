import express from "express";
import { RESPONSE } from "../utils/responses.js";
import { mwFormValidation, mwJWTValidation } from "../middleware/authMw.js";
import { ctrRegOrLog, ctrJWT} from "../controllers/authCtr.js"


const authRouter = express.Router()

authRouter.post('/', mwFormValidation, ctrRegOrLog);
authRouter.get('/jwt', mwJWTValidation, ctrJWT);

export default authRouter;