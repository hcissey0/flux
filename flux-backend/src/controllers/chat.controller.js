import Chat from "../models/chat.model";
import User from "../models/user.model";


/**
 * The Chat controller
 *
 * @export
 * @class ChatController
 * @typedef {ChatController}
 */
export default class ChatController {


    /**
     * Creates a Chat
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {unknown}
     */
    static async createChat(req, res) {
        const { name, chatType } = req.body;

        const { userid } = req.headers;
        if (!userid) return res.status(400).json({error:'userid not found'})
        const user = await User.findOne({ id: userid });
        if (!user) return res.status(404).json({error:'user not found'});

        if (!name) return res.status(404).json({error:'name not found'});
        if (!chatType) return res.status(404).json({error:'chat type not found'});
        if (!['single-chat', 'group-chat'].includes(chatType)) return res.status(400).json({error:'invalid chat type'})

        const chat = new Chat();
        chat.creator = user;
        chat.name = name;
        chat.participants.push(user);
        chat.chatType = chatType;

        user.chats.push(chat);

        chat.save();
        user.save();

        return res.json({ chat });
    }

    /**
     * Gets all Chats
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {unknown}
     */
    static async getAllChats(req, res) {
        const chats = await Chat.find();
        return res.json({ chats });
    }

    /**
     * Gets a Chat
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {unknown}
     */
    static async getChat(req, res) {
        const { chatId } = req.params;

        const chat = await Chat.findOne({ id: chatId });
        if (!chat) return res.status(404).json({error:'chat not found'});

        return res.json({ chat });
    }

    /**
     * Updates a Chat
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {unknown}
     */
    static async updateChat(req, res) {
        const { chatId } = req.params;

        const update = req.body;
        update.edited = true;

        const chat = await Chat.findOneAndUpdate(
            { id: chatId },
            update,
            { returnDocument: 'after' }
        );
        if (!chat) return res.json({error:'chat not found'});

        return res.json({ chat });
    }

    /**
     * Deletes a Chat
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {unknown}
     */
    static async deleteChat(req, res) {
        const { chatId } = req.params;

        const chat = await Chat.findOneAndDelete({ id: chatId });
        if (!chat) return res.json({error:'chat not found'});

        return res.json({});
    }
}