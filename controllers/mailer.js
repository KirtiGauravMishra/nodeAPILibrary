// mailer.js
const nodemailer = require('nodemailer');

// Create a transporter object for sending emails
const transporter = nodemailer.createTransport({
  // Replace the following options with your email service provider details
  service: 'Nodemailer',
  auth: {
    user: 'kirtigaurav1@gmail.com',
    pass: 'realpassword',
  },
});

// Function to send the password reset email
const sendPasswordResetEmail = async (recipientEmail, resetToken) => {
  const mailOptions = {
    from: 'kiirtigaurav1@gmail.com', // Replace with your email address
    to: recipientEmail,
    subject: 'Password Reset Request',
    html: `<p>Hello,</p>
      <p>You have requested to reset your password. Click the link below to reset your password:</p>
      <p><a href="http://your-website.com/reset-password/${resetToken}">Reset Password</a></p>
      <p>If you didn't request this, please ignore this email.</p>
      <p>Best regards,</p>
      <p>Your Website Team</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    // Handle any errors that occurred while sending the email
    console.error('Error sending email:', error);
    throw new Error('Failed to send password reset email');
  }
};

module.exports = { sendPasswordResetEmail };
