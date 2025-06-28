/*-------------------------------- Packages ----------------------------------*/
//express, router, all the related models
const express= require('express');
const router= express.Router();
const User= require('../models/user');
const Department= require('../models/department');

/*-------------------------------- Create New Department ----------------------------------*/

router.get('/create-department', async (req,res)=>{
    res.render('departments/create-department.ejs')
});

router.post('/create-department',async(req,res)=>{
const departmentInDatabase= await Department.findOne({departmentname:req.body.departmentname});
if(departmentInDatabase){
    return res.send('Department already Registered')
}

const department= await Department.create(req.body);
res.redirect('/departments/create-department')
});

/*-------------------------------- View All Departments ----------------------------------*/



/*-------------------------------- Edit Departments ----------------------------------*/


/*-------------------------------- delete Departments ----------------------------------*/



/*-------------------------------- Module Exports ----------------------------------*/

module.exports=router