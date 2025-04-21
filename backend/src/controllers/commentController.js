import Comment from '../models/Comment.js';
import Recipe from '../models/Recipe.js';

// Get all comments for a recipe
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ recipe: req.params.id }).populate('user', 'username');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a comment to a recipe
export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const recipeId = req.params.id;

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });

    const comment = new Comment({
      content,
      user: req.user._id,
      recipe: recipeId
    });

    const createdComment = await comment.save();
    res.status(201).json(createdComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a comment
export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    comment.content = req.body.content || comment.content;
    const updatedComment = await comment.save();
    res.json(updatedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await comment.deleteOne();
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
