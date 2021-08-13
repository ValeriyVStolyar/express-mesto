const { celebrate, Joi } = require('celebrate');
const cardsRouter = require('express').Router();

const {
  getCards, createCard, deleteCard,
  likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);

cardsRouter.post('/',
celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required()
    .pattern(/^https?:\/{2}(w{3}\.)?((((\w+[-]*))*)\.[a-z]{2,6}((\/?\w+\/?){1,9})?|(((\w*\.){1,9}([a-z]){1,6}(\/\w*[-]*){1,9}(\w*)(\.[a-z]+))))(\#)?/),
  }),
}),
createCard);

cardsRouter.delete('/:cardId',
celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}),
deleteCard);

cardsRouter.put('/:cardId/likes',
celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}),
likeCard);

cardsRouter.delete('/:cardId/likes',
celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}),
dislikeCard);

module.exports = cardsRouter;
