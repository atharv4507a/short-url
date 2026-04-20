const express = require('express');
const router = express.Router();
const urlController = require('../controller/urlController');

router.post('/create', urlController.create);
router.get('/all', urlController.getAll);
router.delete('/delete/:id', urlController.deleteUrl);
router.get('/:shortId', urlController.redirect);

module.exports = router;
