import User from "../models/user.model";


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
     * @returns {unknown}
     */
    static async createUser(req, res) {
        const {
            firstName,
            lastName,
            username,
            password,
            email
        } = req.body;

        const userAvail = await User.findOne({ username });
        if (userAvail) return res.json({error:'user already available'})

        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.username = username;
        user.password = password;
        user.email = email;

        user.save();

        res.json({ user });
    }

    /**
     * Gets all Users
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {unknown}
     */
    static async getAllUsers(req, res) {
        const users = await User.find();
        res.json({ users })
    }

    /**
     * Gets a User
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {unknown}
     */
    static async getUser(req, res) {
        const { userId } = req.params;

        const user = await User.findOne({ id: userId });

        if (!user) {
            res.json({error:'user not found'});
        } else {
            res.json({ user });
        }
    }

    /**
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {unknown}
     */
    static async updateUser(req, res) {
        const { userId } = req.params;
        const update = req.body;

        const user = await User.findOneAndUpdate(
            { id: userId },
            update,
            { returnDocument: 'after' }
        );

        if (user) {
            res.json({ user });
        } else {
            res.json({error:'user not found'});
        }
    }

    /**
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {unknown}
     */
    static async deleteUser(req, res) {
        const { userId } = req.params;

        const user = await User.findOneAndDelete({ id: userId });
        if (!user) return res.status(404).json({error:'user not found'});

        return res.json({});
    }
}
