import { hashPassword, comparePassword } from "../utils/hash.js";
import { PrismaClient } from "@prisma/client";
import { RESPONSE } from "../utils/responses.js";
import { generateJWT, verifyJWT } from "../utils/jwt.js";



const prisma = new PrismaClient();



export const ctrJWT = async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    const jwtCheck = verifyJWT(token)
    if (jwtCheck.error === true) return res.send(RESPONSE.TOKEN.ERROR.EXPIRED)
    
    return res.send(jwtCheck)
}



export const ctrRegOrLog = async (req, res) => {
    const { username, password, scenario } = req.body;

    console.log(scenario)

    try {
        const userExist = await prisma.user.findFirst({
            where: {
                username: username,
            },
        });

        if (userExist) {
            const pwd_confirmation = comparePassword(password, userExist.password)
            if (pwd_confirmation === false) {
                return res.send(RESPONSE.PASSWORD.ERROR.INCORRECT)
            }
            const jwtToken = generateJWT(userExist.username, userExist.password, '1hr')
            return res.send({...RESPONSE.USER.SUCCESS.FOUND, token: jwtToken})
        }

        if (scenario === 'Login') return res.send(RESPONSE.USER.ERROR.NOT_FOUND)


        const pwdHash = await hashPassword(password);
        const newUser = await prisma.user.create({
            data: {
                username: username,
                password: pwdHash,
            },
        });
        const jwtToken = generateJWT(newUser.username, newUser.password, '1hr')

        return res.send({...RESPONSE.USER.SUCCESS.CREATED, token: jwtToken});

    } catch (error) {
        // Handle any errors
        console.error('Error in ctrRegOrLog:', error);
        res.send(RESPONSE.USER.ERROR.CREATING);
    }
};
