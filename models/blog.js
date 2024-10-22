const mongoose = require("mongoose");

let blogSchema = new mongoose.Schema(
    {
        title: {

        },
        author: {
            type: String,
            trim: true,
            required: true
        },
        comment: {
            type: String,
            trim: true,
            required: true
        },
    }
)
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;