const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        permission: {
            // Normal. 0 | Admin. 1
            type: Number,
            default: 0,
        },
        avatar: {
            type: String,
            default: "https://2.pik.vn/20215d847251-c38f-4480-afbb-514c4680b72e.jpg"
        },
        coverImg: {
            type: String,
            default: "https://2.pik.vn/2021f1d56074-ea90-4a37-b2dd-80f89e90bb3c.jpg"
        },
        banned: {
            type: Boolean,
            default: false
        },
        notifications: [
            {
                review: {
                    type: Schema.Types.ObjectId,
                    ref: 'Review',
                },
                seenNotification: {
                    type: Boolean,
                },
            },
        ],
    },
    { timestamps: true, collection: 'users' }
);

module.exports = mongoose.model('User', User);
