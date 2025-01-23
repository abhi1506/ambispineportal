const express = require("express");
const router = express.Router();
const {
  createQuotation,
  getQuotations,
  deleteQuotation,
} = require("../controllers/quotationController");


router.post("/create", createQuotation);


router.get("/", getQuotations);
router.delete('/:id', deleteQuotation);


module.exports = router;
