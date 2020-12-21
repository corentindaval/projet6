const express = require('express');
const router = express.Router();
const sauce = require('../models/sauce');
const saucectrl = require('../controleurs/ctrlsauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.post('/', auth, multer, saucectrl.postsauce);/*envoie d'une requete post */

/*router.use('/',auth,saucectrl.createsauce); definition du contenu de stuff(format json) */

router.get('/', auth, saucectrl.getsauces);/*recup des sauces */

router.get('/:id', auth, saucectrl.getsauce);/*parametre get */

router.put('/:id', auth, multer, saucectrl.putsauce);/*parametre put (modif) */

router.delete('/:id', auth, saucectrl.deletesauce);/*parametre delete */

router.post('/:id/like', auth, saucectrl.like);





module.exports = router;