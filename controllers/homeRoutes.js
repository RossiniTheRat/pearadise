const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// Renders the homepage
router.get('/', async (req, res) => {
    res.render('homepage', {
      logged_in: req.session.logged_in,
    });
});

// Renders zone page
router.get('/zone', async (req, res) => {
  res.render('zone', {
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

router.get('/dashboard', withAuth, async (req, res) => {
  try {
      const userId = req.session.user_id;
      const postData = await Post.findAll({
          where: { userId: userId }
      });
      const myPosts = postData.map((post) => post.get({ plain: true }));

      res.render('dashboard', { 
          myPosts,
          logged_in: req.session.logged_in
       });
  } catch (err) {
      res.status(500).json(err);
  }
});

router.get('/discuss', withAuth, async (req, res) => {
  try {
      const postData = await Post.findAll();
      const myPosts = postData.map((post) => post.get({ plain: true }));

      res.render('discuss', { 
          myPosts,
          logged_in: req.session.logged_in
       });
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;