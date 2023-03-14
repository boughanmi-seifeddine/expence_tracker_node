const express = require('express');

const transactionController = require('./../controllers/transactionController');

const router = express.Router();

router
    .route('/')
    .get(transactionController.getAll)
    .post(transactionController.checkBody, transactionController.create)
router
    .route('/:id')
    .delete(transactionController.remove)
    .get(transactionController.getOne)
module.exports = router;