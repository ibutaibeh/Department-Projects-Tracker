/*-------------------------------- Packages ----------------------------------*/
// express, router, bcrypt and all related models
const express= require('express');
const router= express.Router();
const User= require('../models/user');
const Department= require('../models/department');
const bcrypt = require('bcrypt');

/*-------------------------------- Create Accounts ----------------------------------*/
router.get('/create-account', async (req,res)=>{
    const departments= await Department.find();
    const accounts= await User.find();
    res.render('authentications/create-account.ejs',{departments,accounts})
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
res.redirect('/authentications/create-account')
});

/*-------------------------------- Sign In ----------------------------------*/
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
//you can add all the attributes needed
    req.session.user={
        username: userInDatabase.username,
        _id:userInDatabase._id,
        role:userInDatabase.role
    }

    res.redirect('/');
})

/*-------------------------------- Sign out ----------------------------------*/

router.get('/sign-out',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
});


/*-------------------------------- Delete Account ----------------------------------*/
router.delete('/create-account/:accountId',async(req,res)=>{
    const accounts= await User.findByIdAndDelete(req.params.accountId);
    accounts.deleteOne(req.body);
    res.redirect('/authentications/create-account');
})
/*-------------------------------- Module Exports ----------------------------------*/

module.exports=router