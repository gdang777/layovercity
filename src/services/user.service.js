const bcrypt = require('bcrypt');
const moment = require('moment');
const User = require('../models/user.model');
const sendMail = require('../utils/sendMail');

exports.createUser = async (firstName, lastName, airline, email, password) => {
    if (await User.isEmailTaken(email)) {
        throw new Error('email_already_taken');
    }

    const hash = await bcrypt.hash(password, 10);
    const otp = Math.floor(Math.random() * 1000000);
    const ExpiresAt = moment().add(15, 'm').toDate();
    const sentAt = moment().toDate();
    const [user] = await Promise.all([
        User.create({
            firstName: firstName,
            lastName: lastName,
            airline: airline,
            email: email,
            password: hash,
            profileAirlinePicture: '',
            'verification.email.otp.isOtpSent': true,
            'verification.email.otp.sentAt': sentAt,
            'verification.email.otp.value': otp,
            'verification.email.otp.ExpiresAt': ExpiresAt,
        }),
        await sendMail({
            toAddress: email,
            subject: '<Team> - Account Verification',
            body: `Dear User, 
            <br /> 
            OTP for validating your e-mail address is <strong style="color: blue;">${otp}</strong>. 
            <br /> 
            Valid for 15 minutes. Kindly don't share your otp with anyone.
            <br /> 
            Regards, <Team> Team.`,
        }),
    ]);

    return user;
};

exports.validateUser = async (email, password) => {
    const user = await User.findOne({ email: email }).lean().exec();
    const result = await bcrypt.compare(password, user.password);
    return { isPasswordMatch: result, user };
};

exports.getUserByEmail = async (email) => {
    const user = await User.findOne({ email: email }).lean().exec();
    return user;
};

exports.getUserById = async (userId, projection = {}) => {
    console.log('userId', userId);
    const user = await User.findOne({ _id: userId }, projection).lean().exec();
    return user;
};

exports.getAllUsers = async (from, size) => {
    const [result, totalCount] = await Promise.all([
        User.find().skip(from).limit(size).lean().exec(),
        User.count().lean().exec(),
    ]);
    return { result, totalCount };
};

exports.sendOTP = async (email, otp, sentAt, ExpiresAt) => {
    const [user] = await Promise.all([
        User.findOneAndUpdate(
            { email },
            {
                $set: {
                    'verification.email.isVerified': false,
                    'verification.email.otp.isOtpSent': true,
                    'verification.email.otp.sentAt': sentAt,
                    'verification.email.otp.value': otp,
                    'verification.email.otp.ExpiresAt': ExpiresAt,
                },
            }
        )
            .lean()
            .exec(),
        await sendMail({
            toAddress: email,
            subject: '<Team> - Account Verification',
            body: `Dear User, 
            <br /> 
            OTP for validating your e-mail address is <strong style="color: blue;">${otp}</strong>. 
            <br /> 
            Valid for 15 minutes. Kindly don't share your otp with anyone.
            <br /> 
            Regards, <Team> Team.`,
        }),
    ]);
    if (!user) {
        throw new Error('USER_NOT_REGISTERED');
    }
    return true;
};

exports.verifyOTP = async (email, otp) => {
    const user = await this.getUserByEmail(email);
    if (!user) {
        throw new Error('USER_NOT_REGISTERED');
    }
    const {
        verification: {
            email: { otp: { value: OtpFromDb, isOtpSent, sentAt, ExpiresAt } = {} } = {},
        } = {},
    } = user;
    if (!isOtpSent) {
        throw new Error('OTP_NOT_SENT');
    }
    if (otp !== OtpFromDb) {
        throw new Error('OTP_INCORRECT');
    }

    const isExpired = !moment().isBefore(moment(ExpiresAt));
    if (isExpired) {
        throw new Error('OTP_EXPIRED');
    }
    await User.updateOne(
        { email },
        {
            $set: {
                'verification.email.isVerified': true,
            },
            $unset: {
                'verification.email.otp.isOtpSent': '',
                'verification.email.otp.sentAt': '',
                'verification.email.otp.value': '',
                'verification.email.otp.ExpiresAt': '',
            },
        }
    )
        .lean()
        .exec();
    return { isOTPVerified: true, user };
};

exports.updateUser = async ({ userId, name, password, subUsers }) => {
    const hash = await bcrypt.hash(password, 10);
    const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        {
            name,
            password: hash,
            ...(subUsers ? { subUsers } : {}),
        },
        { returnDocument: 'after' }
    )
        .lean()
        .exec();
    return updatedUser;
};

exports.updateProfilePicture = async ({ email, profileAirlinePicture }) => {
    const user = await User.findOne({ email: email }).lean().exec();
    const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        {
            profileAirlinePicture: profileAirlinePicture,
        },
        { returnDocument: 'after' }
    )
        .lean()
        .exec();
    console.log('update', updatedUser);
    return updatedUser;
};

exports.updateStatus = async ({ userId, value }) => {
    const user = await User.findOne({ _id: userId }).lean().exec();
    console.log('service update', userId, value);
    const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        {
            verification: {
                ...user.verification,
                isAdminVerified: value,
            },
        },
        { returnDocument: 'after' }
    )
        .lean()
        .exec();
    return updatedUser;
};

exports.blockUser = async ({ userId, value }) => {
    const user = await User.findOne({ _id: userId }).lean().exec();
    const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        {
            verification: {
                ...user.verification,
                isBlocked: value,
            },
        },
        { returnDocument: 'after' }
    )
        .lean()
        .exec();
    return updatedUser;
};
