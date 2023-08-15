const router = require('express').Router();
const userRoutes = require('./userRoutes');
const discussRoutes = require('./discussRoutes');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/users', userRoutes);
router.use('/discuss', discussRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;