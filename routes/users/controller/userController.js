const { errorHandler } = require("../../utils/index");
const User = require("../model/User");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, username, password, email } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: hashedPassword,
    });

    let savedUser = await newUser.save();

    res
      .status(200)
      .json({ message: "user has been created", payload: savedUser });
  } catch (error) {
    res.status(500).json({ message: error, error: errorHandler(error) });
  }
};

module.exports = {
  createUser,
};
