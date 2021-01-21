const express = require('express')
const app = express()

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Library', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log("MongoDB connected")).catch((err) => { })
mongoose.connection.on("error", err => {
    console.log(`DB connection error: ${err.message}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const port = process.env.PORT || 3030

const nav = [
    { link: '/books', name: 'Books' },
    { link: '/authors', name: 'Authors' },
    { link: '/signup', name: 'SignUp' },
    { link: '/login', name: 'Login' },
    { link: '/admin', name: 'Admin' }
]

const booksRouter = require('./src/routes/booksRouter')(nav);
const authorsRouter = require('./src/routes/authorsRouter')(nav);
const adminRouter = require('./src/routes/adminRouter')(nav);

app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

app.use('/books', booksRouter)
app.use('/authors', authorsRouter)
app.use('/admin', adminRouter)


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

app.get("*", (req, res) => {
    res.status(400).render("error", {
        nav,
        title: "Error 404",
        error: "Page not found",
        message: "The page you are trying to access is invalid",
    });
});


app.listen(port, () => console.log(`Running at ${port}`))