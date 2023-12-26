import { CONSTANTS } from "../utils/constants.js";
import { RESPONSE } from "../utils/responses.js";
import { valPassword, valUsername } from '../utils/validation.js'


export const mwFormValidation = async (req, res, next) => {
    const { username, password } = req.body;

    const _check_pwd = valPassword(password);
    if (_check_pwd.error === true) return res.send(_check_pwd);

    const _check_username = valUsername(username);
    if (_check_pwd.error === true) return res.send(_check_username);

    next();
}

export const mwJWTValidation = async (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader) return res.send(RESPONSE.TOKEN.ERROR.NOT_FOUND);

    const token = authHeader.split(' ')[1];
    if (!token) return res.send(RESPONSE.TOKEN.ERROR.NOT_FOUND);


    next();
}