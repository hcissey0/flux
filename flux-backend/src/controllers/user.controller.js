import User from "../models/user.model";
import { BadRequestError, NotFoundError } from "../utils/errors";


/**
 * The User controller
 *
 * @export
 * @class UserController
 * @typedef {UserController}
 */
export default class UserController {

    /**
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     * @returns {unknown}
     */
    static async createUser(req, res, next) {
        try {
            const {
                firstName,
                lastName,
                username,
                password,
                email
            } = req.body;

            const userAvail = await User.findOne({ username }, { password: 0 });
            if (userAvail) throw new BadRequestError('User already available');

            const user = new User();
            user.firstName = firstName;
            user.lastName = lastName;
            user.username = username;
            user.password = password;
            user.email = email;

            user.save();

            res.json({ user });

        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    /**
     * Gets all Users
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     * @returns {unknown}
     */
    static async getAllUsers(req, res, next) {
        try {
            const users = await User.find({}, { password: 0 });

            return res.json({ users })
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    /**
     * Gets a User
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     * @returns {unknown}
     */
    static async getUser(req, res, next) {
        try {
            const { userId } = req.params;

            const user = await User.findOne({ _id: userId }, { password: 0 });
            if (!user) throw new NotFoundError('User');

            return res.json({ user });
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    /**
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     * @returns {unknown}
     */
    static async updateUser(req, res, next) {
        try {
            const { userId } = req.params;
            const update = req.body;

            const user = await User.findOneAndUpdate(
                { _id: userId },
                update,
                { returnDocument: 'after', projection: { password: 0 } }
            );

            if (!user) throw new NotFoundError('User');

            return res.json({ user });

        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    /**
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     * @returns {unknown}
     */
    static async deleteUser(req, res, next) {
        try {
            const { userId } = req.params;

            const user = await User.findOneAndDelete({ _id: userId });
            if (!user) throw new NotFoundError('User')

            return res.json({});
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

    /**
     * Follows a User
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     * @returns {unknown}
     */
    static async followUser(req, res, next) {
        try {
            const { userId } = req.params;

            const user = await User.findOne({ _id: userId }, { password: 0 });
            if (!user) throw new NotFoundError('User');

            const currentUser = req.user;
            let followed = false;

            if (!user.followers.includes(currentUser.id)) {
                user.followers.push(currentUser);
                currentUser.following.push(user);
                followed = true;
            } else {
                user.followers.pop(currentUser);
                currentUser.following.pop(currentUser);
            }
            currentUser.save();
            user.save();

            return res.json({ followed, user });

        } catch (err) {
            console.error(err);
            next(err);
        }
    }
}
