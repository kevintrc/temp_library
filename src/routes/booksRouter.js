const express = require('express');
const bookData = require('../models/bookData');

const booksRouter = express.Router()

function router(nav) {


    booksRouter.get('/', (req, res) => {
        bookData.find().then((books) => {
            res.render('books',
                {
                    nav,
                    title: "Books",
                    books
                })
        }).catch((err) => res.render("error", {
            nav,
            title: "Error 500",
            error: "Internal Server Error",
            message: err
        }))

    })

    booksRouter.get('/:id', (req, res) => {
        bookData.findById(req.params.id).then((book) => {
            res.render('book',
                {
                    nav,
                    title: "Book",
                    book
                })
        }).catch((err) => res.render("error", {
            nav,
            title: "Error 500",
            error: "Internal Server Error",
            message: err
        }))

    })
    booksRouter.get('/:id/bookeditor', (req, res) => {
        bookData.findById(req.params.id).then((book) => {
            res.render('bookeditor',
                {
                    nav,
                    title: "EDITOR",
                    book
                })
        }).catch((err) => res.render("error", {
            nav,
            title: "Error 500",
            error: "Internal Server Error",
            message: err
        }))

    })

    booksRouter.get("*", (req, res) => {
        res.status(400).render("error", {
            nav,
            title: "Error 404",
            error: "Page not found",
            message: "The page you are trying to access is invalid",
        });
    });


    return booksRouter;
}

module.exports = router;