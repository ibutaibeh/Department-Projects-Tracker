const mongoose= require('mongoose');
const departmentSchema= new mongoose.Schema({
    departmentname:{
    type: String,
    required:true
    } 
});

const Department= mongoose.model('Department',departmentSchema);
module.exports=Department;