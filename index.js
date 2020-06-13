const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const BlogPost = require('./models/BlogPost.js')


mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})

const app = new express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine', 'ejs')

app.use(express.static('public'))


app.post('/posts/store', async (req, res) =>{
    await BlogPost.create(req.body)
    res.redirect('/')
})

app.get('/', async (req,res)=>{
    const blogposts = await BlogPost.find({})
    res.render('index' ,{
        blogposts
    });
})

app.get('/about',(req,res)=>{
    res.render('about');
})

app.get('/contact',(req,res)=>{
    res.render('contact');
})

app.get('/post',(req,res)=>{
    res.render('post');
})

app.get('/posts/new',(req,res)=>{
    res.render('create');
})


app.listen(4000, ()=>{
    console.log('App listening on port 4000')
})
