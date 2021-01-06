const express = require('express');

const authorsRouter = express.Router()

function router(nav) {
    const authors = [
        {
            nationality: 'Indian',
            name: 'Sachin Tendulkar',
            born: '1973',
            image: 'sachin.jpg',
            description: "Sachin Ramesh Tendulkar is an Indian former international cricketer who served as captain of the Indian national team. He is widely regarded as one of the greatest batsmen in the history of cricket. He is the highest run scorer of all time in International cricket."
        },
        {
            nationality: 'English',
            name: 'William Shakespeare',
            born: '1564',
            image: 'william.jpg',
            description: "William Shakespeare was an English playwright, poet, and actor, widely regarded as the greatest writer in the English language and the world's greatest dramatist. He is often called England's national poet and the 'Bard of Avon'"
        },
        {
            nationality: 'Irish',
            name: 'George Bernard Shaw',
            born: '1856',
            image: 'george.jpg',
            description: "George Bernard Shaw, known at his insistence simply as Bernard Shaw, was an Irish playwright, critic, polemicist and political activist. His influence on Western theatre, culture and politics extended from the 1880s to his death and beyond"
        },
        {
            nationality: 'English',
            name: 'Lewis Carroll',
            born: '1832',
            image: 'lewis.jpg',
            description: "Charles Lutwidge Dodgson, better known by his pen name Lewis Carroll, was an English writer of children's fiction, notably Alice's Adventures in Wonderland and its sequel Through the Looking-Glass. He was noted for his facility with word play, logic, and fantasy"
        }

    ]

    authorsRouter.get('/', (req, res) => {
        res.render('authors',
            {
                nav,
                title: "Authors",
                authors
            })
    })

    authorsRouter.get('/:id', (req, res) => {
        const id = req.params.id;
        res.render('author',
            {
                nav,
                title: "Authors",
                author: authors[id]
            })
    })
    return authorsRouter;
}

module.exports = router;