import Chat from "../models/chat.model";
import Message from "../models/message.model";
import User from "../models/user.model";


/**
 * The Message controller
 *
 * @export
 * @class MessageController
 * @typedef {MessageController}
 */
export default class MessageController {

    /**
     * Creates a Message
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {unknown}
     */
    static async createMessage(req, res) {
        const { userid, chatid } = req.headers;

        if (!userid) return res.status(400).json({error:'userid not found'});
        if (!chatid) return res.status(400).json({error:'chatid not found'});

        const { text } = req.body;
        if (!text) return res.status(400).json({error:'message text not found'});

        const user = await User.findOne({ id: userid });
        if (!user) return res.status(404).json({error:'user not found'});
        const chat = await Chat.findOne({ id: chatid });
        if (!chat) return res.status(404).json({error:'chat not found'});

        const message = new Message();
        message.author = user;
        message.chat = chat;
        message.text = text;

        chat.messages.push(message);

        message.save();
        chat.save();
        user.save();

        return res.json({ message });
    }

    /**
     * Gets all Messages
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {unknown}
     */
    static async getAllMessages(req, res) {
        const messages = await Message.find();

        return res.json({ messages });
    }

    /**
     * Gets a Message
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {unknown}
     */
    static async getMessage(req, res) {
        const { messageId } = req.params;

        const message = await Message.findOne({ id: messageId });
        if (!message) return res.status(404).json({error:'message not found'});

        return res.json({ message });
    }

    /**
     * Updates a Message
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {unknown}
     */
    static async updateMessage(req, res) {
        const { messageId } = req.params;

        const update = req.body;
        update.edited = true;

        const message = await Message.findOneAndUpdate(
            { id: messageId },
            update,
            { returnDocument: 'after' }
        );
        if (!message) return res.status(404).json({error:'message not found'});

        return res.json({ message });
    }


    /**
     * Deletes a Message
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {unknown}
     */
    static async deleteMessage(req, res) {
        const { messageId } = req.params;

        const message = await Message.findOneAndDelete({ id: messageId });

        if (!message) return res.status(404).json({error:'message not found'});
        return res.json({});
    }
}
