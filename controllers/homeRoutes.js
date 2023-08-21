const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Renders the homepage
router.get('/', async (req, res) => {
    res.render('homepage', {
      logged_in: req.session.logged_in,
    });
});

// Renders zone page
router.get('/identify', async (req, res) => {
  res.render('identify', {
    logged_in: req.session.logged_in,
  });
});

// Possibly add a page where everyone can see fellow users
// router.get('/', withAuth, async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       attributes: { exclude: ['password'] },
//       order: [['name', 'ASC']],
//     });

//     const users = userData.map((project) => project.get({ plain: true }));

//     res.render('plant-lovers', {
//       users,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/createAccount', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('createAccount');
});

router.get('/profile', withAuth, async (req, res) => {
  try {
      const userId = req.session.user_id;
      const userData = await User.findOne({
          attributes: { exclude: ['password'] },
          where: { id: userId }
      });
      const user = userData.get({ plain: true });

      res.render('profile', { 
          user,
          logged_in: req.session.logged_in
       });
  } catch (err) {
      res.status(500).json(err);
  }
});

// Get route for the discussion board to display all posts
router.get('/discuss', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ['name'] }],
      order: [['createdAt', 'DESC']],
    });

    if (!postData) {
      alert('There are no posts yet. Please create the first!');
      res.redirect('/dashboard');
    }

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('discuss', { posts, logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve posts.' });
  }
});

// Get individual post by ID
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const post_id = req.params.id;
    const postData = await Post.findByPk(post_id, {
      include: [User, { model: Comment, include: User }],
    });

    const post = postData.get({plain:true});

    res.render('post', { post, logged_in: req.session.logged_in });
  } catch (error) {
    res.status(500).json({ message: 'An error has occurred' });
  }
});

// GET comments for a specific post by post's ID
router.get('/post/:id/comments', async (req, res) => {
  try {
    const commentsData = await Comment.findAll({
      where: { post_id: req.params.id },
      include: [{ model: User, attributes: ['name'] }],
      order: [['createdAt', 'DESC']],
    });

    const comments = commentsData.map((comment) => comment.get({ plain: true }));

    res.render('comments', { comments, logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve comments.' });
  }
});

module.exports = router;