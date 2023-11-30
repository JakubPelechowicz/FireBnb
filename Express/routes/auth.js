const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authenticateToken = require('../middleware/jwt')
const hashing = require("../utils/hashing");

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email: email}});
    if (!user) {
        return res.status(403).json({message: 'unauthenticated'})
    }
    if (! await hashing.verifyHash(password, user.password)) {
        return res.status(403).json({message: 'unauthenticated'})
    }else{
    const token = jwt.sign({email: user.email}, process.env.TOKEN_SECRET, {expiresIn: 3600})
    return res.status(200).json({ token });
    }
})

router.get("/me", authenticateToken,(req, res) => {
    res.send(req.user);
})

module.exports = router;