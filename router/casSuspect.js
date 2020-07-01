const express = require('express');
const router = express.Router();
const   casSuspectControler =require('../controller/casSuspect');


router.post('/createCasSuspect',casSuspectControler.createCasSuspect);
router.post('/getCasSuspect',casSuspectControler.getCasSuspect);
router.get('/getCasSuspects',casSuspectControler.getCasSuspects);

router.post('/changerEtatToConfirme',casSuspectControler.changerEtatToConfirme);
router.post('/changerEtatToNegtive',casSuspectControler.changerEtatToNegtive);
router.post('/changerEtatToGueri',casSuspectControler.changerEtatToGueri);
router.post('/changerEtatToDecede',casSuspectControler.changerEtatToDecede);






module.exports = router;