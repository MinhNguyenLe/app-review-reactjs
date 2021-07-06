const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Post = new Schema(
    {
        byUser: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        inThread: {
            type: Schema.Types.ObjectId,
            ref: 'Thread',
            require: true,
        },
        content: {
            type: String,
            required: true
        },
        isDeleted : {
            type: Boolean,
            default: false
        },
        reported :{
            state: {
                type: Boolean, // false = decline, true = approve 
                default: false
            },
            reportedBy: { // username
                type: String,
                default: ""
            },
            reason: {
                type: String,
                default: "Nội dung không phù hợp."
            }
        }
    },
    { timestamps: true, collection: 'posts' }
);

module.exports = mongoose.model('Post', Post);
