const Comment = require("../model/Comment");
const User = require("../../users/model/User");
const Post = require("../../posts/model/Post");
const { errorHandler } = require("../../utils/index");

async function createComment(req, res) {
  try {
    const decodedData = res.locals.decodedToken;

    let foundUser = await User.findOne({ email: decodedData.email });

    let createComment = new Comment({
      comment: req.body.comment,
      post: req.params.id,
      owner: foundUser._id,
    });

    let savedComment = await createComment.save();

    foundUser.commentHistory.push(savedComment._id);

    await foundUser.save();

    let foundPost = await Post.findById(req.params.id);

    foundPost.commentHistory.push(savedComment._id);

    await foundPost.save();

    res.json({ message: "success", payload: savedComment });
  } catch (e) {
    res.status(500).json({ message: "error", error: errorHandler(e) });
  }
}

async function deleteComment(req, res) {
  try {
    const foundComment = await Comment.findById(req.params.id);
    // if (foundComment.owner.toString() === foundUser._id.toString()) {
    let deletedComment = await Comment.findByIdAndDelete(req.params.id);

    let foundPost = await Post.findById(deletedComment.post);

    let foundPostCommentArray = foundPost.commentHistory;

    let filteredPostCommentArray = foundPostCommentArray.filter(
      (comment) => `${comment._id}` !== `${deletedComment._id}`
    );

    foundPost.commentHistory = filteredPostCommentArray;

    await foundPost.save();

    const decodedData = res.locals.decodedToken;

    let foundUser = await User.findOne({ email: decodedData.email });

    let foundUserCommentArray = foundUser.commentHistory;

    let filteredUserCommentArray = foundUserCommentArray.filter(
      (comment) => `${comment._id}` !== `${deletedComment._id}`
    );

    foundUser.commentHistory = filteredUserCommentArray;

    await foundUser.save();

    res.json({ message: "success", payload: deletedComment });
    // } else {
    //   throw { message: "you do not have permission" };
    // }
  } catch (e) {
    res.status(500).json({ message: "error", error: errorHandler(e) });
  }
}

async function updateComment(req, res) {
  try {
    let foundComment = await Comment.findById(req.params.id);
    console.log(foundComment);

    //You also need to check if you are the owner of the comment!
    const decodedData = res.locals.decodedToken;

    let foundUser = await User.findOne({ email: decodedData.email });

    if (foundComment.owner.toString() === foundUser._id.toString()) {
      let updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

      res.json({ message: "success", payload: updatedComment });
    } else {
      res
        .status(500)
        .json({ message: "error", error: "You don't have permission" });
    }
  } catch (e) {
    res.status(500).json({ message: "error", error: errorHandler(e) });
  }
}

module.exports = {
  createComment,
  deleteComment,
  updateComment,
};
