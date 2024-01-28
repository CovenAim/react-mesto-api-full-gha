const express = require('express');
const { celebrate } = require('celebrate');
const cardController = require('../controllers/cardController');
const { createCardSchema, cardIdSchema } = require('../validation/validation');

const router = express.Router();

router.get('/', cardController.getCards);
router.post(
  '/',
  celebrate({ body: createCardSchema }),
  cardController.createCard,
);
router.put('/:cardId/likes', celebrate(cardIdSchema), cardController.likeCard);
router.delete('/:cardId', celebrate(cardIdSchema), cardController.deleteCard);
router.delete(
  '/:cardId/likes',
  celebrate(cardIdSchema),
  cardController.dislikeCard,
);

module.exports = router;
