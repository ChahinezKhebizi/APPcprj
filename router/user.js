const express = require('express');
const router = express.Router();
const   userControler =require('../controller/user');
const   casSuspectContoler =require('../controller/casSuspect');
const multer = require('multer');
const path = require('path');
let resError = {};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'public/');
    },
    filename: function (req, file, cb) {
        if (file){
            let customName = Date.now() +  path.extname(file.originalname);
            req.body.file = customName;
            cb(null, customName);
        }
    }
});

const upload = multer({storage:storage,
    fileFilter: function (req, file, callback) {
        let ext = path.extname(file.originalname);
        if(ext !== '.xls' && ext !== '.xlsx') {
            resError.status = 422; resError.message = 'invalid file format'; resError.code = 13;
            resError.path = 'AuthAPI, user, upload image root';  resError.endPoint = req.originalUrl;
            return callback(resError);
        }
        callback(null, true)
    }
    ,limits:{fileSize:1024*1024}}); // 10MO size

router.post('/sendEmail',upload.single('file'), function (req, res, next) {
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
        attachments: {filename:req.body.file,path:"public/"+req.body.file}}
    transporter.sendMail(mailOptions,function (error,info) {
        if (error){
            console.log(error)
        }else
            res.status(200).json({message:"succes"})
    })
});
router.get('/getCommune/:id',casSuspectContoler.getCommune);
router.post('/createUser',userControler.createUser);
router.post('/authentificate',userControler.authentificate);
router.get('/getUsers',userControler.getUsers);

module.exports = router;
