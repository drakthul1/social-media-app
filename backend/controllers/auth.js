const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
//register
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ user });
};
//login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json("Please provide an email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json("Invalid email");
  }
  const checkPassword = await user.comparePassword(password);
  if (!checkPassword) {
    res.status(StatusCodes.UNAUTHORIZED).json("Invalid password");
  }
  res.status(StatusCodes.OK).json(user);
};

module.exports = { register, login };
