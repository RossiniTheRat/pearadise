const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Post, Comment } = require('../../models');

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userId = req.user.id;
        const postData = await Post.findAll({
            where: { userId: userId }
        });
        const myPosts = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', { 
            myPosts,
            logged_in: req.session.logged_in
         });
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

router.delete('/comment/:id', async (req, res) => {
    try {
        const commentId = req.params.id;
        await Comment.destroy({ where: { id: commentId } });
        res.redirect('/dashboard');
    } catch (err) {
        res.status(500).json({ message: 'An error has occurred' });
    }
});

module.exports = router;