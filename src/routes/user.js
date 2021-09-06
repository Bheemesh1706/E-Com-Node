router = require("express").Router();
User = require("../models/User");
jwt = require("jsonwebtoken");
bcrypt = require("bcrypt");

router.post("/register",async (req,res)=>
{
    console.log(req.body)
    
})

module.exports = router