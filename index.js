//Modules
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const fileUpload = require('express-fileupload')

//Controllers
const newPostController = require('./controllers/newPost')
const storePostController = require('./controllers/storePost')
const homeController = require('./controllers/home')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

//Middleware
const validateMiddleWare = require('./middleware/validationMiddleware')
const expressSession = require('express-session')
const authMiddleWare = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddlewWare = require('./middleware/redirectIfAuthenticatedMiddleware')

global.loggedIn = null;

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})

const app = new express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(fileUpload())

app.use('/posts/store', validateMiddleWare)

app.use(expressSession({
    secret: 'important secret'
}))

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});

app.post('/posts/store', authMiddleWare, storePostController)

app.get('/', homeController)

app.get('/post/:id', getPostController)

app.get('/posts/new', authMiddleWare, newPostController)

app.get('/auth/register', redirectIfAuthenticatedMiddlewWare, newUserController)

app.post('/users/register', redirectIfAuthenticatedMiddlewWare, storeUserController)

app.get('/auth/login', redirectIfAuthenticatedMiddlewWare, loginController)

app.post('/users/login', redirectIfAuthenticatedMiddlewWare, loginUserController)

app.get('/auth/logout', logoutController)

app.use((req, res) => res.render('notfound'));

app.listen(4000, ()=>{
    console.log('App listening on port 4000')
})
