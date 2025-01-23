const express = require("express");
const router = express.Router();

const upload = require('../uploads/upload');

const { createJobApplication, updateJobApplication, deleteJobApplication, getAllJobApplications } = require("../controllers/jobController");

router.post("/job-application", upload.single("resume"), createJobApplication);
router.get('/job-applications', getAllJobApplications);
router.put("/job-application/:id",upload.single("resume"), updateJobApplication);


router.delete("/job-application/:id", deleteJobApplication);

module.exports = router;