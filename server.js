if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')


//routers
const indexRouter = require('./routers/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
// la linea de abajo no la entendi bien
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

//database connection
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.pdjg3.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
const mongoose = require('mongoose')
mongoose.connect(uri,  {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log(e))



app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)