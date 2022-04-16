const bcrypt = require('bcrypt');
const moment = require('moment');
const User = require('../models/adminUsers.model');
const sendMail = require('../utils/sendMail');

exports.createUser = async (firstName, lastName, email, password) => {
    if (await User.isEmailTaken(email)) {
        throw new Error('email_already_taken');
    }

    const hash = await bcrypt.hash(password, 10);

    const [user] = await Promise.all([
        User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hash,
        }),
        await sendMail({
            toAddress: email,
            subject: '<Team> - Account Added',
            body: `Dear User, 
            <br /> 
            You have been added to the admin panel. 
            <br /> 
            Email: <strong style="color: blue;">${email}</strong>
            <br /> 
            Password: <strong style="color: blue;">${hash}</strong>
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
