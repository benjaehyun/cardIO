const express = require('express');
const router = express.Router();

const commentsCtrl = require('../controllers/comments')
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.post('/decks/:deckId/comments', ensureLoggedIn, commentsCtrl.createDeckComment)
router.post('/decks/:deckId/cards/:cardId/comments', ensureLoggedIn, commentsCtrl.createCardComment)
router.delete('/decks/:deckId/cards/:cardId/comments/:commentId', ensureLoggedIn, commentsCtrl.deleteCardComment)
router.delete('/decks/:deckId/comments/:commentId', ensureLoggedIn, commentsCtrl.deleteDeckComment)

module.exports = router





