const Stories = require('../models/stories.model');

exports.addStory = async (data) => {
    const [user] = await Promise.all([
        Stories.create({
            ...data,
        }),
    ]);

    return user;
};

exports.getStoryById = async (StoryId) => {
    const Story = await Stories.findOne({ _id: StoryId }).lean().exec();
    return Story;
};

exports.getAllStories = async (from, size) => {
    const [result, totalCount] = await Promise.all([
        Stories.find().skip(from).limit(size).lean().exec(),
        Stories.count().lean().exec(),
    ]);
    return { result, totalCount };
};

exports.blockStory = async ({ storyId, value, accessToken }) => {
    const updatedStory = await Stories.findOneAndUpdate(
        { _id: storyId },
        {
            isBlocked: value,
        },
        { returnDocument: 'after' }
    )
        .lean()
        .exec();
    return updatedStory;
};

exports.updateStory = async ({ storyId, data, accessToken }) => {
    console.log('data', data, accessToken);
    const Story = await Stories.findOne({ _id: storyId, createdBy: accessToken }).lean().exec();
    console.log('Story', Story);
    const updatedStory = await Stories.findOneAndUpdate(
        { _id: storyId, createdBy: accessToken },
        {
            ...Story,
            ...data,
        },
        { returnDocument: 'after' }
    )
        .lean()
        .exec();
    console.log('Story', Story);
    return updatedStory;
};
