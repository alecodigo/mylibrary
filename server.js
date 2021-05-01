if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')


//routers
const indexRouter = require('./routers/index')
const authorRouter = require('./routers/authors')
const booksRouter = require('./routers/books')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
// la linea de abajo no la entendi bien
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))


//database connection
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.pdjg3.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
const mongoose = require('mongoose')
mongoose.connect(uri,  {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log(e))


// le decimos a node que use estos routers
app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', booksRouter)

app.listen(process.env.PORT || 3000)