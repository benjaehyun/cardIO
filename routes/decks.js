const express = require('express');
const router = express.Router();

const decksCtrl = require('../controllers/decks')
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get('/', decksCtrl.index)
// router.get('/new', ensureLoggedIn, decksCtrl.new)



router.get('/:id', decksCtrl.show)

module.exports = router