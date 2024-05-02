const mongoose = require('mongoose');

const blogsSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
      
    },
    desc: {
        type: String,
        required: [true, 'Description is required'],
       
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userID:String,
    username:String
    
}, {
    versionKey: false
});

const BlogsModel = mongoose.model("posts", blogsSchema);

module.exports = { BlogsModel}