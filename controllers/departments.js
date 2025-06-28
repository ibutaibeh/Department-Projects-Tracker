/*-------------------------------- Packages ----------------------------------*/
//express, router, all the related models
const express= require('express');
const router= express.Router();
const User= require('../models/user');
const Department= require('../models/department');

/*-------------------------------- Create New Department ----------------------------------*/

router.get('/create-department', async (req,res)=>{
    const departments= await Department.find();
    res.render('departments/create-department.ejs',{departments});
});

router.post('/create-department',async(req,res)=>{
const departmentInDatabase= await Department.findOne({departmentname:req.body.departmentname});
if(departmentInDatabase){
    return res.send('Department already Registered')
}

const department= await Department.create(req.body);
res.redirect('/departments/create-department')
});


/*-------------------------------- delete Departments ----------------------------------*/
router.delete('/create-department/:departmentId',async(req,res)=>{
    const department= await Department.findByIdAndDelete(req.params.departmentId);
    department.deleteOne(req.body);
    res.redirect('/departments/create-department');
})


/*-------------------------------- Module Exports ----------------------------------*/

module.exports=router