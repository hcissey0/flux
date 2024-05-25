import { generateToken } from '../middlewares/authentication/auth.middlwares';
import User from '../models/user.model';
import { AuthenticationError, UnauthorizedError } from '../utils/errors';

export default class AuthController {


    /**
     * Connects the User
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     * @returns {unknown}
     */
    static async connectUser(req, res, next) {
        try {
            const credentials = req.headers.authorization;

            if (!credentials || !credentials.startsWith('Basic ')) {
                throw new AuthenticationError('Invalid authentication method. Basic Auth required');
            }

            const [username, password] = atob(credentials.replace('Basic ', '')).split(':');

            const user = await User.findOne({ username, password });
            if (!user) throw new UnauthorizedError('Invalid credentials');
            const token = generateToken(user.id);

            return res.json({ user, token });

        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    /**
     * Gets the current User
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     * @returns {unknown}
     */
    static async getMe(req, res, next) {
        try {
            const user = req.user;

            return res.json({ user })

        } catch (err) {
            console.error(err);
            next(err);
        }
    }
}
