const path = require('path')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3500
const { logger } = require('./middleware/logEvents')

// custom middle ware logger

app.use(logger)

// built in middleware (form data)

app.use(express.urlencoded({extended: false}))

// (json - non form data)

app.use(express.json())

// serving static files

app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
    //res.sendFile('./views/index.html', {root: __dirname})
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/index(.html)?', (req, res) => {

    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/new-page(.html)?', (req, res) => {

    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html')
})

// route handlers

app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html')
    next()
},  (req, res) => {
    res.send('Hello world')
})

app.get('/*', (req,res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));