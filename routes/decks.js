const express = require('express');
const router = express.Router();

const decksCtrl = require('../controllers/decks')
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get('/', ensureLoggedIn, decksCtrl.index) // probably ensure logged in 
router.get('/all', decksCtrl.allDecks)
router.get('/new', ensureLoggedIn, decksCtrl.new)
router.get('/:deckId/edit', decksCtrl.edit)


router.get('/:deckId', decksCtrl.show)
router.post('/', ensureLoggedIn, decksCtrl.create)
router.put('/:id', decksCtrl.update)
router.delete('/:deckId', ensureLoggedIn, decksCtrl.delete)


module.exports = router