const router = require('express').Router();
const { Post } = require('../../models');
// will have to create post model later

router.get('/discuss', async (req, res) => {
    try {
        const postData = Post.findAll();
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('discuss', posts);
    } catch (err) {
        res.status(500).json({message: 'An error has occured'})
    }
});

router.post('/discuss', async (req, res) => {
    try {
        const postData = await Post.create()
    } catch (err) {
        res.status(500).json({message: 'An error has occured'})
    }
})