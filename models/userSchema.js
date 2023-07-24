const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Password should be at least 6 characters long"],
    },
});

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.createJWT = function (user) {
    return jwt.sign(
        { email: user.email, id: user._id },
        'TYTHTGHFGHGGHGHGHGGHh',
        {
            expiresIn: '1h',
        }
    );
};

module.exports = mongoose.model('User', userSchema);
