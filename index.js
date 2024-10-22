
const express = require('express');
const path = require('path');
const Blog = require('./models/blog');
const mongoose = require('mongoose')
const methodOverride = require("method-override")
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/blogApp')
    .then(() => {
        console.log("db is connected");
    }).catch(() => {
        console.log("db is not connected");
    })


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//task 1 display all blogs
app.get('/blogs', async (req, res) => {
    let allBlogs = await Blog.find({});
    res.render('index', { allBlogs });
})

//form
app.get('/blog/new', (req, res) => {
    res.render('new');
})

//add blog on db
app.post('/blogs', async (req, res) => {
    let { title, author, comment } = req.body;
    let newBlog = Blog.create({ title, author, comment });
    res.redirect('/blogs');
})

//show a particular blog
app.get('/blogs/:id', async (req, res) => {
    let { id } = req.params;
    let foundProduct = await Blog.findById(id);
    res.render('show', { foundProduct })

})
//edit
app.get('/blogs/ :id/edit', async (req, res) => {
    let { id } = req.params;
    try {
        let foundProduct = await Blog.findById(id);
        if (!foundProduct) {
            return res.status(404).send('Blog not found');
        }
        res.render('edit', { foundProduct });
    } catch (err) {
        res.status(500).send(err.message);

    }
}) 


//update a blog
app.patch('/blogs/:id', async (req, res) => {
    let { id } = req.params;
    // console.log(req.params.id);
    let { comment } = req.body;
    // console.log(req.body.comment)
    await Blog.findByIdAndUpdate(id, { comment });
    res.redirect('/blogs')
})

// deleting
app.delete('/blogs/:id', async (req, res) => {
    let { id } = req.params;
    await Blog.findByIdAndDelete(id);
    res.redirect('/blogs')
})


app.listen(8080, () => {
    console.log('server is connected to port 8080');
})