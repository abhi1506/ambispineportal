const express = require('express');
const router = express.Router();
const TeamController = require('../controllers/TeamController');
const upload = require('../uploads/upload');

router.post('/', upload.single('avatar'), TeamController.createTeamMember);


router.get('/', TeamController.getAllTeamMembers);

router.get('/:id', TeamController.getTeamMemberById);

router.put('/:id', upload.single('avatar'), TeamController.updateTeamMember);

router.delete('/:id', TeamController.deleteTeamMember);

module.exports = router;
