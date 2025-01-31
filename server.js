const express = require("express");
const app = express();
const fileUpload = require('express-fileupload');
const cloudinary = require("cloudinary").v2;
const PORT = process.env.PORT || 3000;
const path = require("path");
// mongoose
const mongoose = require('mongoose')
const session = require('express-session');
const flash = require('express-flash');
const MongoDBStore = require('connect-mongo')(session);
const passport = require('passport');

cloudinary.config({
    cloud_name: 'da1rvqpxk',
    api_key: '232498318747879',
    api_secret: 'bYfbuMAhMZcVuh0E412NBNuyCW8',
});

require('dotenv').config();
const staticPath = path.join(__dirname, "public");
// database connection
mongoose.set("strictQuery", false);
const mongoURL = 'mongodb://127.0.0.1/indyaspeak';
mongoose.connect(mongoURL);
const connection = mongoose.connection;
connection.once('open', ()=>{
    try {
        console.log('Database connected...');
    } catch (error) {
        console.log('Database failed...'); 
    }
    
});


app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(fileUpload({
    useTempFiles:true
}));
// session store
let mongoStore = new MongoDBStore({
    mongooseConnection:connection,
    connection:'sessions',
})
//session config
app.use(session({
    secret: 'indyspeak sadkdisji saj',
    resave: false,
    store:mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000*60*60*24 }
}))
//passport config
const passportInit = require('./app/config/passport')
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());
// flash
app.use(flash());

//globle middleware
app.use((req,res,next)=>{
    //res.locals.session = req.session;
    res.locals.user = req.user;
    next();
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "resources/views"));
app.use(express.static(staticPath));
app.use('/news-post/edit', express.static(staticPath));
app.use('/polls/edit', express.static(staticPath));
require('./routes/web')(app);

app.listen(PORT, (err)=>{
    if(!err){
        console.log(`${PORT} Connection SuccessFully !`);
    }else{
        console.log(err);
    }
})


// for error https://www.youtube.com/watch?v=8UnbXKUVxS4