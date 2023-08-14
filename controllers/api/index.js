const router = require('express').Router();
const userRoutes = require('./userRoutes');
const discussRoutes = require('./discussRoutes');

router.use('/users', userRoutes);
router.use('/discuss', discussRoutes);

module.exports = router;