const express = require('express');
const authorData = require('../models/authorData');


const authorsRouter = express.Router()

function router(nav) {

    authorsRouter.get('/', (req, res) => {
        authorData.find().then((authors) => {
            res.render('authors',
                {
                    nav,
                    title: "Authors",
                    authors
                })
        }).catch((err) => res.render("error", {
            nav,
            title: "Error 500",
            error: "Internal Server Error",
            message: err
        }))

    })

    authorsRouter.get('/:id', (req, res) => {
        authorData.findById(req.params.id).then((author) => {
            res.render('author',
                {
                    nav,
                    title: "Author",
                    author
                })
        }).catch((err) => res.render("error", {
            nav,
            title: "Error 500",
            error: "Internal Server Error",
            message: err
        }))

    })

    authorsRouter.get("*", (req, res) => {
        res.status(400).render("error", {
            nav,
            title: "Error 404",
            error: "Page not found",
            message: "The page you are trying to access is invalid",
        });
    });


    return authorsRouter;
}

module.exports = router;