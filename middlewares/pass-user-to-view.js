const passUsertoView= (req,res,next)=>{
    res.locals.user= req.session.user ? req.session.user: null;
    next();
}
module.exports= passUsertoView;

//we use this middleware to pass the user to all ejs pages