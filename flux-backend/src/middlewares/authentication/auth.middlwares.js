import jwt from "jsonwebtoken";
import { AuthenticationError, NotFoundError, UnauthorizedError } from "../../utils/errors";
import User from "../../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || '6bad3208e5625d6e9e48fbcdbfede66193026a0f42ac212578358a64889baf8bf7a310541d6eaf5ef8eaac5d98f437b7f302a2f37750b2147fd0e53f590510a9d21ca78499d2d8d0eb5acec67da6ca7d954654d446ccc7ee5473765e3b7cbc72';
const JWT_ALGORITHM = process.env.JWT_ALGORITHM || 'HS256';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '1d';


/**
 * Generates a JWT Token
 * (This function is not supposed to be in this
 * file, but for the benefits of using the constants
 * in the file, that was why I declared it here.)
 *
 * @param {String} userId
 * @returns {String}
 */
export const generateToken = (userId)  => {
    const payload = { userId };

    const token = jwt.sign(payload, JWT_SECRET, { algorithm: JWT_ALGORITHM, expiresIn: JWT_EXPIRY });

    return token;
}


/**
 * JWT authenticator
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AuthenticationError('Invalid authentication method. Bearer Auth required');
        }

        const token = authHeader.split(' ')[1];

        try {

            const payload = jwt.verify(token, JWT_SECRET, { algorithms: [JWT_ALGORITHM] });

            const user = await User.findOne({ _id: payload.userId }, { password: 0 });
            if (!user) throw new NotFoundError('User');
            req.user = user;
        } catch(err) {
            console.error(err)
            throw new UnauthorizedError('Expired/Invalid Token');
        }

        next();
    } catch (err) {
        console.error(err);
        next(err);
    }
}
