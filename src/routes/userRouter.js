const express = require('express');
const userData = require('../models/userData');

const userRouter = express.Router()

function router(nav) {

    userRouter.post("/signup", async (req, res) => {
        const items = {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: req.body.password
        }
        const user = userData(items)
        await user.save().catch((err) => res.status(409).render("error", {
            nav,
            title: "Error 409 Conflict",
            error: "Email already exists, Please login",
            message: err
        }))
        return res.redirect('/admin')

    })

    userRouter.post("/login", async (req, res) => {
        try
        {
            const user = await userData.findByCredentials(req.body.email, req.body.password)
            return res.redirect('/admin')
        } catch (err)
        {
            res.status(400).render("error", {
                nav,
                title: "Error 400",
                error: "Access Denied",
                message: err
            })
        }
    })
    return userRouter;
}

module.exports = router;