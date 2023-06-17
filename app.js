const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const routes = require("./routes") //預設會去找index.js

const usePassport = require('./config/passport')

require('./config/mongoose')
const app = express()
const PORT = process.env.PORT

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, //true的話, 每次更新都會帶入新的
    saveUninitialized: true //true會強制把全新的session塞入
}))


// setting static files
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())

app.use((req, res, next) => {
    console.log(req.user)
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg')
    res.locals.warning_msg = req.flash('warning_msg')
    next()
})

app.use(routes)


// start and listen on the Express server
app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})