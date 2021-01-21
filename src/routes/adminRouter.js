const express = require('express');
const bookData = require('../models/bookData');
const authorData = require('../models/authorData');
const multer = require("multer");
const sharp = require('sharp');
const fs = require('fs');

const adminRouter = express.Router()

function router(nav) {

    adminRouter.get('/', (req, res) => {
        res.render('admin',
            {
                nav,
                title: "Admin"
            })
    })


    const upload = multer({
        limits: {
            fileSize: 15000000
        },
        fileFilter(req, file, cb) {
            if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|bmp)$/))
                return cb(new Error("File type not supported "));
            cb(undefined, true);
        }
    });


    adminRouter.post('/addbook', upload.single('avatar'), async (req, res) => {
        const buffer = await sharp(req.file.buffer)
            .rotate()
            .resize({ width: 250, height: 250 })
            .png()
            .toBuffer();
        const items = {
            title: req.body.title,
            genre: req.body.genre,
            author: req.body.author,
            image: buffer,
            description: req.body.description
        }
        const book = bookData(items)
        book.save().then(() => res.status(500).redirect('/books')).catch((err) => res.status(500).render("error", {
            nav,
            title: "Error 500",
            error: "Internal Server Error",
            message: err
        }))

    }, (err, req, res, next) => {
        if (err) return res.status(500).render("error", {
            nav,
            title: "Error 500",
            error: "Internal Server Error",
            message: err
        })
    })
    adminRouter.post('/addauthor', upload.single('avatar'), async (req, res) => {
        const buffer = await sharp(req.file.buffer)
            .rotate()
            .resize({ width: 250, height: 250 })
            .png()
            .toBuffer();
        const items = {
            name: req.body.name,
            nationality: req.body.nationality,
            born: req.body.born,
            image: buffer,
            description: req.body.description
        }
        const author = authorData(items)
        author.save().then(() => res.redirect('/authors')).catch((err) => res.status(500).render("error", {
            nav,
            title: "Error 500",
            error: "Internal Server Error",
            message: err
        }))

    }, (error, req, res, next) => {
        if (error) return res.status(400).send({ error: error.message });
    })

    adminRouter.post("/:id/bookedit", upload.single('avatar'), async (req, res) => {
        var items = {
            title: req.body.title,
            genre: req.body.genre,
            author: req.body.author,
            description: req.body.description,
        }
        if (req.file)
        {
            const buffer = await sharp(req.file.buffer)
                .rotate()
                .resize({ width: 250, height: 250 })
                .png()
                .toBuffer();
            items.image = buffer;
        }
        await bookData.findByIdAndUpdate(req.params.id, items);
        res.redirect('/books')
    })

    adminRouter.post("/:id/bookdelete", async (req, res) => {
        await bookData.findByIdAndDelete(req.params.id);
        res.redirect('/books')
    })

    adminRouter.get("*", (req, res) => {
        res.status(400).render("error", {
            nav,
            title: "Error 404",
            error: "Page not found",
            message: "The page you are trying to access is invalid",
        });
    });

    return adminRouter;
}

module.exports = router;

