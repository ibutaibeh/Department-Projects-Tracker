/*-------------------------------- Packages ----------------------------------*/
const express= require('express')
const router= express.Router();
const User= require('../models/user');
const Project = require('../models/project');


/*-------------------------------- Create New Project ----------------------------------*/

router.get('/create-project',async(req,res)=>{
    const projects= await Project.find();
    console.log("projects,", projects)

    const accounts= await User.find();
    console.log("accounts,", accounts)
    res.render('projects/create-project.ejs',{projects,accounts})
});





/*-------------------------------- Edit and update project ----------------------------------*/




/*-------------------------------- Delete Projects ----------------------------------*/



/*-------------------------------- Module Exports ----------------------------------*/

module.exports=router;