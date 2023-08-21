const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Connect posts to users
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});
  
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// Connect comments to users
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});
  
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// Connect posts to comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };