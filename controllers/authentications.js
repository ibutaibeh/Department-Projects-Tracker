const express= require('express');
const router= express.Router();
const User= require('../models/user');
const bcrypt = require('bcrypt');

router.get('/create-account', async (req,res)=>{
    res.render('authentications/create-account.ejs')
});

router.post('/create-account',async(req,res)=>{
    const userInDatabase= await User.findOne({username:req.body.username});
   if(userInDatabase){
    return res.send('username already taken')
   } 

   if(req.body.password!==req.body.confirmPassword){
    return res.send('password do not match')
   }
const hashedPassword = bcrypt.hashSync(req.body.password,10);
req.body.password= hashedPassword;

const user= await User.create(req.body);
res.send(`Thanks for creating the account for ${user.username}`)
});



router.get('/sign-in',async(req,res)=>{
    res.render('authentications/sign-in.ejs')
})


router.post('/sign-in',async(req,res)=>{
    const userInDatabase= await User.findOne({username:req.body.username})

    if(!userInDatabase){
        return res.send('Login Failed')
    }

    const validPassword= bcrypt.compareSync(req.body.password, userInDatabase.password);
    if(!validPassword){
        return res.send('Login Failed')
    }

    req.session.user={
        username: userInDatabase.username,
        _id:userInDatabase._id
    }

    res.redirect('/');
})

router.get('/sign-out',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
});

module.exports=router