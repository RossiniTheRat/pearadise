const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Post } = require('../../models');

// Route to create a new post
router.post('/create', withAuth, async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.session.userId;
        await Post.create({ title, content, userId });
    } catch (err) {
        res.status(500).json({ message: 'An error has occurred' });
    }
});

router.delete('/post/:id', withAuth, async (req, res) => {
    try {
        const postId = req.params.id;
        await Post.destroy({ where: { id: postId } });
        res.redirect('/dashboard');
    } catch (err) {
        res.status(500).json({ message: 'An error has occurred' });
    }
});


module.exports = router;
