//Modules
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const fileUpload = require('express-fileupload')
const flash = require('connect-flash')

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

mongoose.connect('mongodb+srv://anders_christmann:anders54340@cluster0-4j288.mongodb.net/website_database', {useNewUrlParser: true})

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

app.use(flash());

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


let port = process.env.PORT;
if (port == null || port == "") {
    port = 4000;
}

app.listen(port, ()=> {
    console.log('App listening...')
})