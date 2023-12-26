import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export function generateJWT(username, passwordHash, expiresIn = '1h') {
    return jwt.sign({
        username: username,
        password: passwordHash,
    }, JWT_SECRET, { expiresIn: expiresIn });
}


export function verifyJWT(token) {
    try {
        const verif_res = jwt.verify(token, JWT_SECRET);
        return {
            error: false,
            username: verif_res.username,
        }
    } catch (error) {
        return {
            error: true,
            message: error.message,
        }
    }
}