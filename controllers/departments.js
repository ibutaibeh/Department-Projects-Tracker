const express= require('express');
const router= express.Router();

router.get('/create-department', async (req,res)=>{
    res.render('departments/create-department.ejs')
});



module.exports=router