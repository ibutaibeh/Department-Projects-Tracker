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

if(req.session.user.role==='chief'){
    await Project.create(req.body);
    res.redirect('/projects/create-project');
}else{
    res.send('You are not Authorized to Create New Prjects');
}
})
/*-------------------------------- Edit and update project ----------------------------------*/

router.get('/view-all-projects',async(req,res)=>{
    const projects=await Project.find().populate('owener');
    const accounts= await User.find();
    res.render('projects/view-all-projects.ejs',{projects,accounts})
})

//Read one

router.get('/:projectId/edit',async(req,res)=>{
    const project= await Project.findById(req.params.projectId).populate('owener');
    const accounts= await User.find();
    res.render('projects/edit.ejs',{project,accounts});
})

router.put('/:projectId',async(req,res)=>{
    const project = await Project.findById(req.params.projectId);
    if(req.session.user.role==='chief'){
    await project.updateOne(req.body);
     res.redirect('/projects/view-all-projects')
    }else{
        res.send('You are not Authorized to Edit/Update Projects')
    }

})

/*-------------------------------- Delete Projects ----------------------------------*/
router.delete('/:projectId',async(req,res)=>{
    const project = await Project.findById(req.params.projectId);

if(req.session.user.role==='chief'){
   await project.deleteOne(req.body);
     res.redirect('/projects/view-all-projects')
}else{
    res.send('You are not Authorized to delete Projects')
}
 
})


/*-------------------------------- Module Exports ----------------------------------*/

module.exports=router;