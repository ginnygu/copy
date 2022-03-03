const Comment = require("../model/Comment");

const getComment = async (req, res) => {
  try {
    const getAllComments = await Comment.find({});
    res.json(getAllComments);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getComment,
};
