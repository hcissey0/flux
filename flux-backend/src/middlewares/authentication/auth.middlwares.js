import jwt from "jsonwebtoken";
import { AuthenticationError, NotFoundError, UnauthorizedError } from "../../utils/errors";
import User from "../../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || 'hello';
const JWT_ALGORITHM = process.env.JWT_ALGORITHM || 'HS256';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '1h';


/**
 * Generates a JWT Token
 *
 * @param {String} userId
 * @returns {String}
 */
export const generateToken = (userId)  => {
    const payload = { userId };
    console.log(payload)

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
            throw new AuthenticationError('Invalid authentication method');
        }

        const token = authHeader.split(' ')[1];

        try {

            const payload = jwt.verify(token, JWT_SECRET, { algorithms: [JWT_ALGORITHM] });

            const user = await User.findOne({ _id: payload.userId }, { password: 0 });
            if (!user) throw new NotFoundError('User');
            req.user = user;
        } catch(err) {
            console.error(err)
            throw new UnauthorizedError('Invalid/Expired Token');
        }

        next();
    } catch (err) {
        console.error(err);
        next(err);
    }
}
