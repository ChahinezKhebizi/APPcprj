const userModel=require('../model/user');
const jwt = require('jsonwebtoken');
var  nodemailer = require('nodemailer');
var transporter =nodemailer.createTransport({
    service : 'Gmail',
    auth:{
        user:'hc_khebizi@esi.dz',
        pass:'**********'
    }

});


module.exports ={
    createUser: function (req,res,next){
        userModel.create(req.body,function(err,result){

                if (err)
                    res.status(400).json({message: "error", data: null});
                else{
                    console(result);
                    res.status(200).json(result);
                }

            }
        );
    },
    authentificate : function (req,res,next ) {
        console.log(req.body);

        userModel.findOne(req.body,function ( err,result){
            console.log("auhtntificate");
            if (err){
                res.status(400).json({message: "error", data:err });
            }else {
                const token = jwt.sign({id: result._id},'secretKey', { expiresIn: '2h' });
                res.status(200).json({token: token});
            }
        })},
    getUsers : function (req,res,next) {
        userModel.find({},function(err,result){
         console.log("dkhal");
            if (err)
                res.status(400).json({message: "error", data: null});
            else{
                res.status(200).json(result);
            }

        });

    },

    sendMail: function (req, res, next) {
        var  nodemailer = require('nodemailer');
        var transporter =nodemailer.createTransport({
            service : 'Gmail',
            auth:{
                user:'hc_khebizi@esi.dz',
                pass:'Chahinez2004+'
            }

        });
        var mailOptions={
            from :'hc_khebizi@esi.dz',
            to:'chahinez20042016@gmail.com',
            subject :'email test',
            text :'notification ',
            attachments:{filename:"file",path:"public/"+req.body.file}
        };
        transporter.sendMail(mailOptions,function (error,info) {
            if (error){
                console.log(error.message)
            }else
                console.log("email sent : "+ info.response);
        })
    }
}