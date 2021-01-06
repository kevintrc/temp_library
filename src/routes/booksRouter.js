const express = require('express');

const booksRouter = express.Router()

function router(nav) {
    const books = [
        {
            title: 'Playing It My Way',
            author: 'Sachin Tendulkar',
            genre: 'Autobiography',
            image: 'sachin.jpg',
            description: "Playing It My Way is the autobiography of former Indian cricketer Sachin Tendulkar. It was launched on 5 November 2014 in Mumbai. The book summarises Tendulkar's early days, his 24 years of international career and aspects of his life that have not been shared publicly"
        },
        {
            title: 'As you like it',
            author: 'William Shakespeare',
            genre: 'Comedy',
            image: 'william.jpg',
            description: "As You Like It is a pastoral comedy by William Shakespeare believed to have been written in 1599 and first published in the First Folio in 1623. The play's first performance is uncertain, though a performance at Wilton House in 1603 has been suggested as a possibility"
        },
        {
            title: 'Arms and the man',
            author: 'George Bernard Shaw',
            genre: 'Love and War',
            image: 'george.jpg',
            description: "Arms and the Man is a comedy by George Bernard Shaw, whose title comes from the opening words of Virgil's Aeneid, in Latin: Arma virumque cano"
        },
        {
            title: 'Alice in the Wonderland',
            author: 'Lewis Carroll',
            genre: 'Fantasy',
            image: 'lewis.jpg',
            description: "Alice, now 19 years old, follows a rabbit in a blue coat to a magical wonderland from her dreams where she is reunited with her friends who make her realise her true destiny."
        }

    ]

    booksRouter.get('/', (req, res) => {
        res.render('books',
            {
                nav,
                title: "Books",
                books
            })
    })

    booksRouter.get('/:id', (req, res) => {
        const id = req.params.id;
        res.render('book',
            {
                nav,
                title: "Books",
                book: books[id]
            })
    })
    return booksRouter;
}

module.exports = router;