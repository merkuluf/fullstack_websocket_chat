import { RESPONSE } from "./responses.js"
import { CONSTANTS } from "./constants.js"

export const valPassword = password => {
    if (!password) {
        return RESPONSE.PASSWORD.ERROR.NOT_FOUND
    }

    if (password.length < CONSTANTS.PASSWORD.MIN_LENGTH) { 
        return RESPONSE.PASSWORD.ERROR.MIN_LENGTH
    }

    if (password.length > CONSTANTS.PASSWORD.MAX_LENGTH) {
        return RESPONSE.PASSWORD.ERROR.MAX_LENGTH
    }

    const hasDigit = /\d/.test(password); // Check for at least one digit
    const hasUpper = /[A-Z]/.test(password); // Check for at least one uppercase letter
    const hasLower = /[a-z]/.test(password); // Check for at least one lowercase letter

    if (!hasDigit | !hasUpper | !hasLower) {
        return RESPONSE.PASSWORD.ERROR.STRENGTH
    } 

    // success
    return RESPONSE.PASSWORD.SUCCESS.ACCEPTED
}



export const valUsername = username => {
    if (!username) {
        return RESPONSE.USERNAME.ERROR.NOT_FOUND
    }

    username = username.trim()
    if (username.length < CONSTANTS.USERNAME.MIN_LENGTH) { 
        return RESPONSE.USERNAME.ERROR.MIN_LENGTH; 
    }
    if (username.length > CONSTANTS.USERNAME.MAX_LENGTH) {
        return RESPONSE.USERNAME.ERROR.MAX_LENGTH
    }
    
    return RESPONSE.USERNAME.SUCCESS.ACCEPTED
}
