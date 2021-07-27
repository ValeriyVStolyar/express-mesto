const cardsRouter = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.post('/', deleteCard);

module.exports = cardsRouter;