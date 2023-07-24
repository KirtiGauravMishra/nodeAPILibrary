// userControllers.js
const User = require('../models/userSchema');
const RefreshToken = require('../models/refreshTokenModel');
const ApiErrorHandler = require('../utils/ApiErrorHandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  // Replace 'YOUR_SECRET_KEY' with your own secret key for signing the token
  return jwt.sign({ userId: user._id }, 'kgmkgmkgmkgmkgmkgm', { expiresIn: '15m' });
};

const generateRefreshToken = () => {
  // Generate a random refresh token
  return jwt.sign({}, 'ijshfufigfjdifdfjgeiu', { expiresIn: '7d' });
};

const signUp = async (req, res, next) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return next(new ApiErrorHandler('Please provide all fields', 400));
    }
    try {
      // Check if a user with the provided email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return next(new ApiErrorHandler('Email is already taken', 409));
      }
      // Create a new user
      const newUser = await User.create({ name, email, password });
  
      newUser.password = undefined;
      res.status(201).json({ user: newUser });
    } catch (error) {
      return next(error);
    }
  };

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ApiErrorHandler('Please provide All Fields', 400));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ApiErrorHandler('Invalid Credentials', 400));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ApiErrorHandler('Invalid Credentials', 400));
    }

    // Create a refresh token and save it to the database
    const refreshToken = generateRefreshToken();
    await RefreshToken.create({ userId: user._id, token: refreshToken });

    const accessToken = generateAccessToken(user);

    user.password = undefined;
    res.status(200).json({ accessToken, refreshToken, user });
  } catch (error) {
    return next(error);
  }
};

const refreshAccessToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return next(new ApiErrorHandler('Refresh token not provided', 400));
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, 'ijshfufigfjdifdfjgeiu');

    // Check if the refresh token is present in the database
    const refreshTokenRecord = await RefreshToken.findOne({ token: refreshToken });
    if (!refreshTokenRecord) {
      return next(new ApiErrorHandler('Invalid refresh token', 401));
    }

    // Check if the refresh token has expired
    if (new Date() > decoded.exp * 1000) {
      // Remove the expired refresh token from the database
      await RefreshToken.deleteOne({ token: refreshToken });
      return next(new ApiErrorHandler('Refresh token has expired', 401));
    }

    // If the refresh token is valid, fetch the corresponding user
    const user = await User.findById(refreshTokenRecord.userId);
    if (!user) {
      return next(new ApiErrorHandler('User not found', 404));
    }

    // Generate a new access token and send it as the response
    const accessToken = generateAccessToken(user);

    res.status(200).json({ accessToken });
  } catch (error) {
    return next(new ApiErrorHandler('Invalid refresh token', 401));
  }
};

const logout = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return next(new ApiErrorHandler('Refresh token not provided', 400));
  }

  try {
    // Remove the refresh token from the database
    await RefreshToken.deleteOne({ token: refreshToken });

    res.cookie('token', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now() + 1000),
    });
    res.status(200).json({ msg: 'User logged out!' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  signUp,
  login,
  refreshAccessToken,
  logout,
};
