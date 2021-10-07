const User = require("../models/User");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/register",async (req,res)=>
{   
    try{
     console.log(req.body);
     const {username,address,password,city,code} = req.body;

     const user = await User.findOne({username})

     if(user) return res.json({ error_message: "User exist" });
    
     const salt = await bcrypt.genSalt(10);
     const hashPassword = await bcrypt.hash(password, salt);

     const newUser = User({username,password: hashPassword,address,city,code})
     const saveUser = await newUser.save();

     const token = jwt.sign(
       { id: saveUser.id, type: "user" },
       process.env.ACCESS_TOKEN_SECRET
     );
     
     return res.json({ jwt: token });
    }
    catch(e)
    { 
      console.log(e.message)
      return res.json({ error_message: e.message });
    }
})

router.post("/login", async (req, res) => {
  
    try{
    console.log(req.body);
    const { username,password} = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.json({ error_message: "User not exist" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.send({ error_message: `Invalid Password` });

     const token = jwt.sign(
       { id: user.id, type: "user" },
       process.env.ACCESS_TOKEN_SECRET
     );

     return res.json({ jwt: token });
   }
    catch(e)
  {
    console.log(e.message);
    return res.json({ error_message: e.message });
  }
});


module.exports = router