const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Connect posts to users
User.hasMany(Post, {
    foreignKey: {name: 'userId'},
    onDelete: 'SET NULL'
});
  
Post.belongsTo(User, {
    foreignKey: {name: 'userId'}
});

// Connect comments to users
User.hasMany(Comment, {
    foreignKey: {name: 'userId'},
    onDelete: 'SET NULL'
});
  
Comment.belongsTo(User, {
    foreignKey: {name: 'userId'}
});

// Connect posts to comments
Post.hasMany(Comment, {
  foreignKey: {name: 'postId'},
  onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
  foreignKey: {name: 'postId'}
});

module.exports = { User, Post, Comment };