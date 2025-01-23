const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const ErrorHandler = require('../../utils/errorhandler');
const sendToken = require('../../utils/jwtToken');


exports.createUser = async (req, res, next) => {
    try {
        const { fullName, username, password, role } = req.body;

        const existingUser = await User.findOne({ username });
        const existingAdmin = await User.findOne({ role: 'Admin' });

        if (role === 'Admin' && existingAdmin) {
            return next(new ErrorHandler('An admin already exists. Please register as a user.', 400));
        }

        if (existingUser) {
            return next(new ErrorHandler('User already exists.', 400));
        }

        
        
        const user = new User({ fullName, username, password, role });
        await user.save();

        res.status(201).json({ success: true, message: 'User created successfully!', user });
    } catch (error) {
        console.error('Error creating user:', error);
        return next(new ErrorHandler('Error creating user', 500));
    }
};


exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    try {
        const user = await User.findOne({ username });
        

        if (!user) {
            console.log('User not found:', username);
            return next(new ErrorHandler('Invalid credentials', 401));
        }

        const isMatch = await bcrypt.compare(password, user.password);
    

        if (!isMatch) {
            console.log('Password does not match for user:', username);
            return next(new ErrorHandler('Invalid credentials', 401));
        }

        // Send token
        sendToken(user, 200, res);
    } catch (error) {
        console.error('Error during login:', error);
        return next(new ErrorHandler('Internal server error', 500));
    }
};




// Change Password
exports.changePassword = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return next(new ErrorHandler('User not found', 404));
        }

        // Check if old password matches
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return next(new ErrorHandler('Old password is incorrect', 400));
        }

        
        if (newPassword.length < 6) {
            return next(new ErrorHandler('New password must be at least 6 characters long', 400));
        }

        
        user.password = newPassword;

        // Save the updated user
        await user.save();

        res.status(200).json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        return next(new ErrorHandler('Error changing password', 500));
    }
};



// exports.forgotPassword = async (req, res, next) => {
//     const { email } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return next(new ErrorHandler('User with this email does not exist', 404));
//         }

//         // Generate reset token
//         const resetToken = crypto.randomBytes(20).toString('hex');
//         user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
//         user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; 
//         await user.save({ validateBeforeSave: false });

//         // Send reset token to user's email
//         const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;
//         const message = `Your password reset token is: \n\n ${resetUrl}`;

//         // Code to send email (integrate with your email service)
//         // await sendEmail({ email: user.email, subject: 'Password Reset', message });

//         res.status(200).json({ success: true, message: `Reset token sent to ${user.email}` });
//     } catch (error) {
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpire = undefined;
//         await user.save({ validateBeforeSave: false });
//         return next(new ErrorHandler('Error sending reset token', 500));
//     }
// };


// Reset Password
// exports.resetPassword = async (req, res, next) => {
//     const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

//     try {
//         const user = await User.findOne({
//             resetPasswordToken,
//             resetPasswordExpire: { $gt: Date.now() },
//         });

//         if (!user) {
//             return next(new ErrorHandler('Invalid or expired reset token', 400));
//         }

//         user.password = await bcrypt.hash(req.body.password, 10);
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpire = undefined;
//         await user.save();

//         res.status(200).json({ success: true, message: 'Password reset successfully' });
//     } catch (error) {
//         return next(new ErrorHandler('Error resetting password', 500));
//     }
// };

