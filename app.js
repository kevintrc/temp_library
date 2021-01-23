const express = require('express')
const app = express()

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@libfiles.tncad.mongodb.net/LIBRARYFSD?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log("MongoDB connected")).catch((err) => { console.log(err); })

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const port = process.env.PORT || 3030

const nav = [
    { link: '/', name: 'Home' },
    { link: '/books', name: 'Books' },
    { link: '/authors', name: 'Authors' },
    { link: '/signup', name: 'SignUp' },
    { link: '/login', name: 'Admin' },
]

const booksRouter = require('./src/routes/booksRouter')(nav);
const authorsRouter = require('./src/routes/authorsRouter')(nav);
const adminRouter = require('./src/routes/adminRouter')([{ link: '/', name: 'Back' }]);
const userRouter = require('./src/routes/userRouter')(nav);

app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

app.use('/books', booksRouter)
app.use('/authors', authorsRouter)
app.use('/admin', adminRouter)
app.use('/user', userRouter)


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