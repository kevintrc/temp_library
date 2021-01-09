const express = require('express')
const app = express()
const port = process.env.PORT || 3030

const nav = [
    { link: '/books', name: 'Books' },
    { link: '/authors', name: 'Authors' },
    { link: '/signup', name: 'SignUp' },
    { link: '/login', name: 'Login' },
    { link: '/addBook', name: 'Add Book' }
]

const booksRouter = require('./src/routes/booksRouter')(nav);
const authorsRouter = require('./src/routes/authorsRouter')(nav);


app.use(express.static('./public'))

app.use('/books', booksRouter)
app.use('/authors', authorsRouter)


app.set('view engine', 'ejs')
app.set('views', './src/views')

app.get('/', (req, res) => {
    res.render('index',
        {
            nav,
            title: "Library"
        })
})

app.get('/signup', (req, res) => {
    res.render('signup',
        {
            nav,
            title: "Signup"
        })
})

app.get('/login', (req, res) => {
    res.render('Login',
        {
            nav,
            title: "Login"
        })
})

app.get('/login', (req, res) => {
    res.render('login',
        {
            nav,
            title: "Login"
        })
})

app.get('/addBook', (req, res) => {
    res.render('addBook',
        {
            nav,
            title: "Add Book"
        })
})




app.listen(port, () => console.log(`Running on ${port}`))