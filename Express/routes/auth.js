const express = require("express");
const User = require("../models/user");
const router = express.Router()

router.post("/login",async (req,res)=>{
    const papaj = await User.create({
        id: 2137,
        fullName: 'jan pawel',
        password: 'jp2gmd',
        email: 'jp2@vaticano.org',
        createdAt: Date.now(),
        updatedAt: Date.now(),
    });

    const users = await User.findAll();

    res.send(users);
})
router.post("/logout",(req,res)=>{
    res.send("cj");
})
router.post("/refresh",(req,res)=>{
    res.send("cj");
})

router.get("/me",(req,res)=>{
    res.send("cj");
})

module.exports = router;