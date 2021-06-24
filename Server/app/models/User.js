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
        },
        coverImg: {
            type: String,
        },
        banned: {
            type: Boolean,
        },
    },
    { timestamps: true, collection: 'users' }
);

module.exports = mongoose.model('User', User);
