const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Post, Comment } = require('../../models');

// Route to create a new comment
router.post('/:postId', withAuth, async (req, res) => {
    try {
        const postId = req.params.postId;
        const { content } = req.body;
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const userId = req.session.userId;
        await Comment.create({ content, postId, userId });
        res.redirect('/discuss');
    } catch (err) {
        res.status(500).json({ message: 'An error has occurred' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const commentId = req.params.id;
        await Comment.destroy({ where: { id: commentId } });
        res.redirect('/dashboard');
    } catch (err) {
        res.status(500).json({ message: 'An error has occurred' });
    }
});

module.exports = router;