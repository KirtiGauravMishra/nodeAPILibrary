// const User = require('../models/userSchema');
// const ApiErrorHandler = require('../utils/ApiErrorHandler');
// const bcrypt = require('bcrypt');

// const signUp = async (req, res) => {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password)
//         throw new ApiErrorHandler('Please provide all fields', 400);
//   // Check if a user with the provided email already exists
//   const existingUser = await User.findOne({ email });

//   if (existingUser) {
//     // If a user with the same email exists, respond with an error message
//     throw new ApiErrorHandler('Email is already taken', 409);
//   }
//     const newUser = await User.create({ name, email, password });
//     //  Password ke response main undefined jayega 
//     newUser.password = undefined;
//     res.status(201).json(newUser);
// };

// const login = async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password)
//         throw new ApiErrorHandler('Please provide All Fields', 400);
//     const user = await User.findOne({ email });
//     if (!user) throw new ApiErrorHandler('Invalid Credentials', 400);
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) throw new ApiErrorHandler('Invalid Credentials', 400);
//     const token = user.createJWT(user);

//     user.password = undefined;
//     res.status(200).json({ token, user });
// };

// const getCurrentUser = async (req, res) => {
//     const user = await User.findOne({ _id: req.user.userId });
//     res.status(200).json({ user, location: user.location });
//   };

//   const logout = async (req, res) => {
//     res.cookie('token', 'logout', {
//       httpOnly: true,
//       expires: new Date(Date.now() + 1000),
//     });
//     res.status(200).json({ msg: 'user logged out!' });
//   };
  

// module.exports = {
//     signUp,
//     login,
//     getCurrentUser,
//     logout,
// };
