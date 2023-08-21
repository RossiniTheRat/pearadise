const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Post, Comment } = require('../../models');

// Create a new post
router.post('/', withAuth, async (req, res) => {
  
    try {
      const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.redirect('/discuss')
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create a new post.' });
    }
  });

// Create a new comment by post ID
router.post('/:id/addComment', withAuth, async (req, res) => {
  
      try {
        const post_id = req.params.id;
        const user_id = req.session.user_id;
        const { content } = req.body;
    
        await Comment.create({
          content,
          post_id,
          user_id,
        });
    
        res.redirect(`/post/${post_id}`);
      } catch (error) {
        console.error(error);
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
