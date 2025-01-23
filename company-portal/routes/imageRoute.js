const express = require('express');
const { uploadImage, getAllImages, getImageById, deleteImageById } = require('../controllers/ImageContoller');
const router = express.Router();

router.post('/upload-image', uploadImage);
router.get('/images', getAllImages);
router.get('/images/:id', getImageById);
router.delete('/images/:id', deleteImageById);

module.exports = router;
