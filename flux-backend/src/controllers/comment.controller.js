import Comment from "../models/comment.model";
import Post from "../models/post.model";
import User from "../models/user.model";
import { NotFoundError } from "../utils/errors";


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
     * @param {import('express').NextFunction} next
     * @returns {unknown}
     */
    static async createComment(req, res, next) {
        try {
            const { text, postId } = req.body;

            if (!text) throw new NotFoundError('"text"')

            const user = req.user;

            const post = await Post.findOne({ _id: postId});
            if (!post) throw new NotFoundError('Post')

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

        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    /**
     * Gets all Comments
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     * @returns {unknown}
     */
    static async getAllComments(req, res, next) {
        try {
            const comments = await Comment.find();
            return res.json({ comments });

        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    /**
     * Gets a Comment
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     * @returns {unknown}
     */
    static async getComment(req, res, next) {
        try {
            const { commentId } = req.params;

            const comment = await Comment.findOne({ _id: commentId });
            if (!comment) return res.status(404).json({error:'comment not found'});

            res.json({comment});

        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    /**
     * Updates a Comment
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     * @returns {unknown}
     */
    static async updateComment(req, res, next) {
        try {
            const { commentId } = req.params;

            const update = req.body;
            update.edited = true;

            const comment = await Comment.findOneAndUpdate(
                { _id: commentId },
                update,
                { returnDocument: 'after' }
            );
            if (!comment) return res.status(404).json({error:'comment not found'});

            return res.json({comment});

        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    /**
     * Deletes a Comment
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     * @returns {unknown}
     */
    static async deleteComment(req, res, next) {
        try {
            const { commentId } = req.params;

            const comment = await Comment.findOneAndDelete({ _id: commentId });

            if (!comment) return res.status(404).json({error:'comment not found'});

            return res.json({});

        } catch (err) {
            console.error(err);
            next(err);
        }
    }
}
