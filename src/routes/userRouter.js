const express = require('express');
const userData = require('../models/userData');
const auth = require('../middlewares/auth');

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
        const token = await user.generateAuthToken()
        res.send({ user, token })

    })

    userRouter.post("/login", auth, async (req, res) => {
        try
        {
            const user = await userData.findByCredentials(req.body.email, req.body.password)
            const token = await user.generateAuthToken()
            res.send({ user, token })
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