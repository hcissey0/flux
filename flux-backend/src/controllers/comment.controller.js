import Comment from "../models/comment.model";
import Post from "../models/post.model";
import User from "../models/user.model";


/**
 * The Comment controller
 *
 * @export
 * @class CommentController
 * @typedef {CommentController}
 */
export default class CommentController {

    /**
     * Creates a Comment
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {unknown}
     */
    static async createComment(req, res) {
        const { userid, postid } = req.headers;
        const { text } = req.body;

        if (!text) return res.status(404).json({error:'comment text not found'})

        const user = await User.findOne({id:userid});
        if (!user) return res.status(404).json({error:'user not found'});
        const post = await Post.findOne({id:postid});
        if (!post) return res.status(404).json({error:'post not found'});

        const comment = new Comment();
        comment.author = user;
        comment.post = post;
        comment.text = text;

        post.comments.push(comment);
        user.comments.push(comment);

        comment.save();
        post.save();
        user.save();

        return res.status(201).json({ comment });
    }

    /**
     * Gets all Comments
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {unknown}
     */
    static async getAllComments(req, res) {
        const comments = await Comment.find();
        return res.json({ comments });
    }

    /**
     * Gets a Comment
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {unknown}
     */
    static async getComment(req, res) {
        const { commentId } = req.params;

        const comment = await Comment.findOne({ id: commentId });
        if (!comment) return res.status(404).json({error:'comment not found'});

        res.json({comment});
    }

    /**
     * Updates a Comment
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {unknown}
     */
    static async updateComment(req, res) {
        const { commentId } = req.params;

        const update = req.body;
        update.edited = true;

        const comment = await Comment.findOneAndUpdate(
            { id: commentId },
            update,
            { returnDocument: 'after' }
        );
        if (!comment) return res.status(404).json({error:'comment not found'});

        return res.json({comment});
    }

    /**
     * Deletes a Comment
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {unknown}
     */
    static async deleteComment(req, res) {
        const { commentId } = req.params;

        const comment = await Comment.findOneAndDelete({ id: commentId });

        if (!comment) return res.status(404).json({error:'comment not found'});

        return res.json({});
    }
}
