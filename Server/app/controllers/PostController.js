const Post = require("../models/Post")
const axios = require("axios")
const User = require("../models/User")
const Thread = require("../models/Thread")
const PostCtrl = {
    getAll: async (req, res) => {
        try {
            let posts = await Post.find({});
            return res.json(posts);
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    getById: async (req, res) => {
        try {
            const id = req.params.id;
            const post = await Post.findById(id);
            if (post){
                return res.status(200).json(post);
            }
            return res.status(404).json({msg: "Can't find post"})
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    create: async (req, res) => {
        try {
            const {
                inThread,
                content,
            } = req.body;

            const postUser = await User.findById(req.user.id)
            const thread = await Thread.findById(inThread);
            
            const newPost = new Post({
                //idUser: req.user.id,
                byUser: postUser._id,
                inThread : inThread,
                content: content
            
            });
            await newPost.save();
            thread.posts.push(newPost.id);
            thread.lastedPostAt = new Date().toISOString();
            thread.lastedPostBy = postUser.username;
            await thread.save();
            return res.status(200).json({code: 1, msg: "Create post successful.", id: newPost.id});
            
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    update: async (req, res) => {
        try {
            let id = req.params.id;
            const {content} = req.body;
            const post = await Post.findById(id);
            if(post){
                post.content = content;
                await post.save();
                return res.status(200).json({code: 1, msg: "Updated post"});
            } 
            return res.status(404).json({code: 0, msg: "Can't find post"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    delete: async (req, res) => {
        try {
            let id = req.params.id;
            const post = await Post.findById(id);
            if(post){
                post.isDeleted = true;
                post.reported.state = false;
                await post.save();
                return res.status(200).json({code: 1, msg: "Deleted post"});
            } 
            return res.status(404).json({code: 0, msg: "Can't find post"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    report: async (req, res) =>{
        try {
            let id = req.params.id;
            const {reportedBy, reason} = req.body;
            const post = await Post.findById(id);
            if(post){
                post.reported.state = true;
                post.reported.reportedBy = reportedBy;
                post.reported.reason = reason;
                await post.save();
                return res.status(200).json({code: 1, msg: "Reported post"});
            } 
            return res.status(404).json({code: 0, msg: "Can't find post"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    getAllReportedPost: async (req, res) =>{
        try {
            //console.log(1);
            let posts = await Post.find({'reported.state': true})
                                .populate('byUser', 'name username')
                                .populate('inThread', 'title')
                                .exec();
            return res.json(posts);
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    decline: async (req, res) =>{
        try {
            let id = req.params.id;
            const post = await Post.findById(id);
            if(post){
                post.isDeleted = false;
                post.reported.state = false;
                post.reported.reportedBy = "";
                post.reported.reason = "";
                await post.save();
                return res.status(200).json({code: 1, msg: "Declined report"});
            } 
            return res.status(404).json({code: 0, msg: "Can't find post"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    }
}

module.exports = PostCtrl;