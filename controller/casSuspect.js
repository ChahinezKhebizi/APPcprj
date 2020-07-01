const casSuspectModel=require('../model/casSuspect');
const jwt = require('jsonwebtoken');


module.exports ={
    getCommune: function (req,res,next) {
    casSuspectModel.find({commune: req.params.id},function(err,result){
        if (err)
            res.status(400).json({message: "error", data: null});
        else{console.log(result);
            res.status(200).json(result);
        }

    });

    },
    createCasSuspect: function (req,res,next){
        casSuspectModel.create(req.body,function(err,result){
            if (err)
                res.status(400).json({message: "error", data: null});
            else{
                res.status(200).json(result);
            }
        }
        );
    },
    supprimerCasSuspect: function (req, res, next) {
        casSuspectModel.findByIdAndRemove({_id: req.params.id},function (err,result) {
            if (err)
                res.status(400).json({message: "error", data: null});
            else{
                res.status(200).json(result);
            }

        })

    },
    changerEtatToConfirme :function (req,res,next) {
        casSuspectModel.findOneAndUpdate({carteNational: req.body.carteNational}, {etat: "confirmé"}, {new: true}).then(function (result,err ){
            if (err)
                res.status(400).json({msg:"invalid token"});
            else{console.log(result);
                res.status(200).json({message: "cas confirmé", data: {result}});}
        })
    },
    changerEtatToNegtive :function (req,res,next) {
        casSuspectModel.findOneAndUpdate({carteNational: req.body.carteNational},{etat: "negative"}, {new: true}).then(function (result,err ){
            if (err)
                res.status(400).json({msg:"invalid token"});
            else {console.log(result);
                res.status(200).json({message: "cas negative", data: {result}});
            }})
    },
    changerEtatToGueri :function (req,res,next) {
        casSuspectModel.findOneAndUpdate({carteNational: req.body.carteNational},{etat: "Guéri"}, {new: true}).then(function (result,err ){
            if (err)
                res.status(400).json({msg:"invalid token"});
            else{console.log(result);
                res.status(200).json({message: "cas Guéri", data: {result}});}
        })
    },
    changerEtatToDecede :function (req,res,next) {
        casSuspectModel.findOneAndUpdate({carteNational: req.body.carteNational}, {etat: "décédé"},{new: true}).then(function (result,err ){
            if (err)
                res.status(400).json({msg:"invalid token"});
            else{console.log(result);
                res.status(200).json({message: "cas décédé", data: {result}});}
        })
    },

    getCasSuspects: function (req,res,next) {
        casSuspectModel.find(function(err,result){
            if (err)
                res.status(400).json({message: "error", data: null});
            else{console.log(result);
                res.status(200).json(result);
            }

        });

    },

    getCasSuspect : function (req,res,next) {
        console.log(req.body)
        casSuspectModel.findOne({carteNational:req.body.carteNational}).then(function( result,err){
            if (err)
                res.status(400).json({message: err.message, data: null});
            else{
                res.status(200).json(result);
                console.log(result);
            }
        })

    },
    // verifierEmail :  function (req, res, next ) {
    //     user_model.findOne({email: req.body.email},function (err,result) {
    //
    //         if(err){
    //             res.status(401).json({message: "error"})
    //         }else {
    //             console.log(result)
    //
    //             if(!result) next();
    //             else res.status(409).json({message: "email existe"})
    //         }
    //
    //
    //
    //     })
    //
    // }

}
