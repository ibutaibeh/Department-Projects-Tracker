const isSignIn= (req,res,next)=>{
    if(req.session.user)return next();
    res.redirect('/authentications/sign-in');
};
module.exports= isSignIn;