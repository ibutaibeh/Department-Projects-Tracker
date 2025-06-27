const express = require('express');
const app = express();
const dotenv= require('dotenv');
dotenv.config();

const mongoose= require('mongoose');
const methodOverride= require('method-override');
const session= require('express-session');
const path= require('path');
const passUsertoView= require('./middlewares/pass-user-to-view');
const isSignIn= require('./middlewares/is-signed-in');

const port = process.env.PORT ? process.env.PORT :"3000";
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected',()=>{
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(
session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized:true,
}));

app.use(passUsertoView);

app.get('/',async(req,res)=>{
    res.render('index.ejs');
});


const authenticationsControl= require('./controllers/authentications');
app.use('/authentications',authenticationsControl);


app.listen(port,()=>{
    console.log(`check http://localhost:${port}`);
});