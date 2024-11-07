const jwt = require('jsonwebtoken')
require('dotenv').config({
    path: `${__dirname}/../config/config.env`
})

module.exports = function (req, res, next) {
    try {

        const token = req.header("x-auth-token")
        // console.log(token)
        if (!token) return res.status(400).json({ msg: "Invalid Authentication." })
        //console.log(token)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).json({ msg: "Invalid Authentication." })

            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

