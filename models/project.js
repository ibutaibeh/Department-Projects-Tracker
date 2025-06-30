const mongoose= require('mongoose');
const projectSchema= new mongoose.Schema({
    projectname:{
        type: String,
        required:true
    },
    startdate:{
        type:Date,
        required: true
    },
    enddate:{
        type:Date,
        required:true
    },
    location:{
        type:String,
        required:false
    },
    area:{
        type:Number,
        required:false
    },
    chartnumber:{
        type:Number,
        required:false
    },
    remark:{
        type:String,
        required:false
    },
    owener:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
]
    
});

const Project= mongoose.model('Project',projectSchema);
module.exports=Project;