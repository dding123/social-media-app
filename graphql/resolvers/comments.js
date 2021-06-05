const { AuthenticationError, UserInputError } = require('apollo-server');

const checkAuth = require('../../util/check_authentication');
const Post = require('../../models/Post');

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);
      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not be empty'
          }
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        console.log(username);
        const newComment = {
            body,
            username,
            createdAt: new Date().toISOString()
        };
        console.log(newComment);
        post.comments.unshift(newComment);
        console.log(post.comments);
        await post.save();
        console.log(post.comments);
        return post;
      } else throw new UserInputError('Post not found');
    },
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);

        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } else {
        throw new UserInputError('Post not found');
      }
    }
  }
};