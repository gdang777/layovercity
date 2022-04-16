const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        airline: {
            type: String,
            required: true,
            trim: true,
        },
        profileAirlinePicture: {
            type: String,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
        },
        verification: {
            email: {
                isVerified: {
                    type: Boolean,
                    default: false,
                },
                otp: {
                    isOtpSent: {
                        type: Boolean,
                        default: false,
                    },
                    value: Number,
                    sentAt: Date,
                    ExpiresAt: Date,
                },
            },
            isAdminVerified: {
                type: Boolean,
                default: false,
            },
            isBlocked: {
                type: Boolean,
                default: false,
            },
        },
    },
    {
        timestamps: true,
    }
);

// To Check if email is taken
userSchema.statics.isEmailTaken = async function (email) {
    const user = await this.findOne({ email });
    return !!user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
