const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

router.get('/', (req, res) => {
    res.send("Hello ,Welcome To Company");
});
router.post('/companies', companyController.createCompany);
router.get('/companies', companyController.getAllCompanies);
router.get('/companies/:id', companyController.getCompanyById);
router.put('/companies/:id', companyController.updateCompany);
router.delete('/companies/:id', companyController.deleteCompany);

module.exports = router;
