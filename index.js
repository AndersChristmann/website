const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const fileUpload = require('express-fileupload')
const newPostController = require('./controllers/newPost')
const storePostController = require('./controllers/storePost')
const homeController = require('./controllers/home')
const getPostController = require('./controllers/getPost')
const validateMiddleWare = require('./middleware/validationMiddleware')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')



mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})

const app = new express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(fileUpload())

app.use('/posts/store', validateMiddleWare)

app.post('/posts/store', storePostController)

app.get('/', homeController)

app.get('/post/:id', getPostController)

app.get('/posts/new', newPostController)

app.get('/auth/register', newUserController)

app.post('/users/register', storeUserController)

app.get('/auth/login', loginController)

app.post('/users/login', loginUserController)

app.listen(4000, ()=>{
    console.log('App listening on port 4000')
})
