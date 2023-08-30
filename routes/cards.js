const express = require('express');
const router = express.Router();

const cardsCtrl = require('../controllers/cards')
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get('/decks/:deckId/cards/new', ensureLoggedIn, cardsCtrl.new)
router.get('/decks/:deckId/cards/:cardId/edit', ensureLoggedIn, cardsCtrl.edit)

router.get('/decks/:deckId/play', ensureLoggedIn, cardsCtrl.play)
router.get('/decks/:deckId/cards/:cardId/play', ensureLoggedIn, cardsCtrl.playCurrentCard)
router.get('/decks/:deckId/cards/:cardId/play/next', ensureLoggedIn, cardsCtrl.nextCard)

router.post('/decks/:deckId/cards/', ensureLoggedIn, cardsCtrl.create)
router.put('/decks/:deckId/cards/:cardId', ensureLoggedIn, cardsCtrl.update)
router.delete('/decks/:deckId/cards/:cardId', ensureLoggedIn, cardsCtrl.delete)


module.exports = router