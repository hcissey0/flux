import Post from "../models/post.model";
import User from "../models/user.model";


/**
 * The Post controller
 *
 * @export
 * @class PostController
 * @typedef {PostController}
 */
export default class PostController {

    /**
     * Creates a Post
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {unknown}
     */
    static async createPost(req, res) {
        const { userid } = req.headers;

        const { text } = req.body;
        if (!text) return res.status(404).json({error:'post text not found'});

        const user = await User.findOne({id:userid});
        if (!user) return res.status(404).json({error:'user not found'});

        const post = new Post();
        post.author = user;
        post.text = text;

        user.posts.push(post);

        post.save();
        user.save();

        return res.status(201).json({ post });
    }


    /**
     * Gets all Posts
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {unknown}
     */
    static async getAllPosts(req, res) {
        const posts = await Post.find();
        return res.json({posts});
    }

    /**
     * Gets a Post
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {unknown}
     */
    static async getPost(req, res) {
        const { postId } = req.params;

        const post = await Post.findOne({id:postId});
        if (!post) return res.status(404).json({error:'post not found'});
        return res.json({post})
    }

    /**
     * Updates a Post
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {unknown}
     */
    static async updatePost(req,res) {
        const { postId } = req.params;
        const update = req.body;
        update.edited = true;

        const post = await Post.findOneAndUpdate(
            { id: postId },
            update,
            { returnDocument: 'after' }
        );

        if (post) {
            return res.json({ post });
        } else {
            return res.status(404).json({error:'post not found'});
        }
    }

    /**
     * Deletes a Post
     *
     * @static
     * @async
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @returns {unknown}
     */
    static async deletePost(req, res) {
        const { postId } = req.params;

        const post = await Post.findOneAndDelete({ id: postId });
        if (!post) return res.status(404).json({error:'post not found'});

        return res.json({});
    }
}
