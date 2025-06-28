/*-------------------------------- Packages ----------------------------------*/
//express, dotenv, mongoose, method-override, express-session, [path/ejs] "no need for require",bcrypt 
const express = require('express'); 
const app = express();
const dotenv= require('dotenv');
dotenv.config();
const mongoose= require('mongoose');
const methodOverride= require('method-override');
const session= require('express-session');
const path= require('path');
/*-------------------------------- Setting up middlewares ----------------------------------*/
// isSingedIn and PassUserToView
const passUsertoView= require('./middlewares/pass-user-to-view');
const isSignIn= require('./middlewares/is-signed-in');

//Setting up PORT
const port = process.env.PORT ? process.env.PORT :"3000";
//Set up up Database
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected',()=>{
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

//to Parse the data from forms requests
app.use(express.urlencoded({extended:false}));
//to use PUT and Delete methods
app.use(methodOverride('_method'));
//setting up sessions
app.use(
session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized:true,
}));
app.use(passUsertoView);


//set up the homepage request
app.get('/',async(req,res)=>{
    res.render('index.ejs');
});

/*-------------------------------- Controllers ----------------------------------*/

const authenticationsControl= require('./controllers/authentications');
const User = require('./models/user');
app.use('/authentications',authenticationsControl);
app.use(isSignIn);
const departmentsControl= require('./controllers/departments');
const Department= require('./models/department');
app.use('/departments',departmentsControl);

/*-------------------------------- Request Listen ----------------------------------*/
app.listen(port,()=>{
    console.log(`check http://localhost:${port}`);
});
