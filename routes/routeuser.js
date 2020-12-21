const express = require('express');
const router = express.Router();
const user = require('../models/user');
const userctrl = require('../controleurs/ctrluser');
const auth = require('../middleware/auth');

router.post('/signup', userctrl.postsignup);/*route signup */

router.post('/login', userctrl.postlogin);/*route login*/

module.exports = router;