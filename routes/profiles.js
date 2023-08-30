var express = require('express');
var router = express.Router();
const profilesCtrl = require('../controllers/profiles')
const ensureLoggedIn = require('../config/ensureLoggedIn')




router.get('/:profileId', profilesCtrl.index)

module.exports = router 