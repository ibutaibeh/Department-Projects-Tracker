/*-------------------------------- Packages ----------------------------------*/
const express= require('express')
const router= express.Router();
const User= require('../models/user');
const Project = require('../models/project');


/*-------------------------------- Create New Project ----------------------------------*/

router.get('/create-project',async(req,res)=>{
    const projects= await Project.find();
    const accounts= await User.find();
    res.render('projects/create-project.ejs',{projects,accounts})
});

router.post('/create-project',async(req,res)=>{
    await Project.create(req.body);
    res.redirect('/projects/create-project');
})



/*-------------------------------- Edit and update project ----------------------------------*/

router.get('/view-all-projects',async(req,res)=>{
    const projects=await Project.find();
    const accounts= await User.find();
    res.render('projects/view-all-projects.ejs',{projects,accounts})
})

//Read one

router.get('/:projectId/edit',async(req,res)=>{
    const project= await Project.findById(req.params.projectId).populate('owener');
    const accounts= await User.find();
    res.render('projects/edit.ejs',{project,accounts});
})

router.put('/:projectId/edit',async(req,res)=>{
     await Project.findByIdAndUpdate(req.params.projectId);
     res.redirect('/projects/view-all-projects')
})
//i have to do forEach loop ro comapre the value of the owener 
//for the date i need to use JS to display the date 
//update page /:id/edit
//put to update
/*-------------------------------- Delete Projects ----------------------------------*/



/*-------------------------------- Module Exports ----------------------------------*/

module.exports=router;