const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Connect posts to users
User.hasMany(Post, {
    foreignKey: 'userId',
    onDelete: 'SET NULL'
});
  
Post.belongsTo(User, {
    foreignKey: 'userId'
});

// Connect comments to users
User.hasMany(Comment, {
    foreignKey: 'userId',
    onDelete: 'SET NULL'
});
  
Comment.belongsTo(User, {
    foreignKey: 'userId'
});

// Connect posts to comments
Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
  foreignKey: 'postId'
});

module.exports = { User, Post, Comment };