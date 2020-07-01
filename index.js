const express = require('express');
const casSuspectRouter = require('./router/casSuspect');
const userRouter = require('./router/user');
const cors = require('./cors');

const bodyParser=require('body-parser');

// const expreshbs=require('express-handlebars');
const mongoose =require('mongoose');
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// connect to the mongo db
try {
    mongoose.connect('mongodb://localhost:27017/APPcprj', { useNewUrlParser: true,useUnifiedTopology:true});
    mongoose.set('useFindAndModify', false);
} catch (error) {
    handleError(error);
}

app.use(cors.corsHeaders);
app.use('/',casSuspectRouter);
app.use('/',userRouter);
app.use(function (err,req,res,next) {
    console.log(err);
    res.status(422).send({error:err.message});
});
//listen for request
app.listen(4000,function(req,res){ console.log('port is listening for request ')});