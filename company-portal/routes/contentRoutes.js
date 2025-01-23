const express = require('express');
const { createContentMessage,getAllContentMessages,deleteContentMessage} = require('../controllers/contentController');
const router = express.Router();

router.post('/', createContentMessage);
router.get('/', getAllContentMessages);
router.delete('/:id', deleteContentMessage);

module.exports = router;