const mongoose= require('mongoose');
const Schema =mongoose.Schema;
const casSuspectSchema= new Schema({
    nom : {
        type : String
    },
    prenom : {
        type :  String
    },
    numTlfn:{
        type : String
    },
    dateNaissance : {
        type : String
    },
    lieuNaissance : {
        type : String
    },
    adresse : {
        type : String
    },
    etat : {

        type : String,
        default:"suspect"
    },
    carteNational:{
        type: String},
    commune:{
        type:String},
    wilaya:{
    type:String}

});
module.exports= mongoose.model('casSuspect',casSuspectSchema);