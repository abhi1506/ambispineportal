const express = require('express');
const router = express.Router();
const careerController = require('../controllers/Admin/careerController');

router.post('/', careerController.createCareer);


router.get('/', careerController.getAllCareers);


router.get('/:id', careerController.getCareerById);


router.put('/:id', careerController.updateCareer);


router.delete('/:id', careerController.deleteCareer);

module.exports = router;
