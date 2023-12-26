import { CONSTANTS } from "./constants.js"

export const RESPONSE = {
    EMAIL: {
        ERROR: {
            NOT_FOUND: {error: true, message: `'email' is required parameter`},
            INVALID: {error: true, message: `'email' is in invalid format`},
            ALREADY_EXISTS: {error: true, message: `such email already exists`},
        },
        SUCCESS: {
            ACCEPTED: {error: false, message: `email accepted`},            
        },  
    },
    PASSWORD: {
        ERROR: {
            MIN_LENGTH: {error: true, message: `password must contain at least ${CONSTANTS.PASSWORD.MIN_LENGTH} characters`},
            MAX_LENGTH: {error: true, message: `password can contain maximum ${CONSTANTS.PASSWORD.MAX_LENGTH} characters`},
            STRENGTH: {error: true, message: `password must contain at least 1 uppercase letter, 1 lowercase letter and one digit`},
            NOT_FOUND: {error: true, message: `'password' is required parameter`},
            INCORRECT: {error: true, message: `incorrect password`}
        },
        SUCCESS: {
            ACCEPTED: {error: false, message: `password accepted`},
        },
    },
    USERNAME: {
        ERROR: {
            NOT_FOUND: {error: true, message: `'username' is required parameter`},
            MIN_LENGTH: {error: true, message: `username must contain at least ${CONSTANTS.USERNAME.MIN_LENGTH} characters`},
            MAX_LENGTH: {error: true, message: `username can contain maximum ${CONSTANTS.USERNAME.MAX_LENGTH} characters`},
        },
        SUCCESS: {
            ACCEPTED: {error: false, message: `username accepted`},
        },
    },
    TOKEN: {
        ERROR: {
            NOT_FOUND: {error: true, message: `jwt token has not been found in request`},
            EXPIRED: {error: true, message: `jwt token has been expired`},
        },
        SUCCESS: {
            ACCEPTED: {error: false, message: `jwt token accepted`},
        },
    },
    USER: {
        ERROR: {
            FETCH_ALL: {error: true, message: `unable to fetch all users`},
            NOT_FOUND: {error: true, message: `user not found`},
            ALREADY_EXISTS: {error: true, message: `such user already exists`},
            CREATING: {error: true, message: `user has not been created`},
        },
        SUCCESS: {
            CREATED: {error: false, message: `user created successfully`},
            FOUND: {error: false, message: `user found successfully`},
        }
    }
};

