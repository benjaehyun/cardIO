const express = require('express');
const router = express.Router();

const cardsCtrl = require('../controllers/cards')
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get('/decks/:id/cards/new', ensureLoggedIn, cardsCtrl.new)
router.post('/decks/:id/cards/', ensureLoggedIn, cardsCtrl.create)