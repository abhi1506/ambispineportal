const TeamMember = require('../models/TeamMember'); 
const ErrorHandler = require('../utils/errorhandler');
const cloudinary = require('cloudinary').v2;

exports.createTeamMember = async (req, res) => {
    try {
      if (!req.file) {
              return res.status(400).send('No file uploaded.');
        }
      console.log(req.file)
      const uploadResult = req.file
        ? await cloudinary.uploader.upload(req.file.path, {
            folder: 'team-members',
            width: 300,
            crop: 'scale',
          })
        : { public_id: null, secure_url: 'https://default-avatar-url.com/avatar.png' };
    
      // Create team member
      const teamMember = new TeamMember({
        ...req.body,
        avatar: {
          public_id: uploadResult.public_id,
          url: uploadResult.secure_url,
        },
      });
    
      const savedTeamMember = await teamMember.save();
    
      res.status(201).json({
        success: true,
        message: 'Team member created successfully',
        teamMember: savedTeamMember,
      });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      });
    }
    
  };



// Get all Team Members
exports.getAllTeamMembers = async (req, res, next) => {
    try {
        const teams = await TeamMember.find();
        res.status(200).json({ message: 'Fetched all team members successfully', teams });
    } catch (err) {
        next(new ErrorHandler('Error fetching team members', 400));
    }
};

// Get a specific Team Member by ID
exports.getTeamMemberById = async (req, res, next) => {
    try {
        const team = await TeamMember.findById(req.params.id);
        if (!team) {
            return next(new ErrorHandler('Team member not found', 404));
        }
        res.status(200).json({ message: 'Fetched team member successfully', team });
    } catch (err) {
        next(new ErrorHandler('Error fetching team member', 400));
    }
};


exports.updateTeamMember = async (req, res) => {
    try {
      const { id } = req.params;
  
      let teamMember = await TeamMember.findById(id);
      if (!teamMember) {
        return res.status(404).json({ message: 'Team member not found' });
      }
  
      let avatar = teamMember.avatar;
      if (req.file) {
        if (teamMember.avatar?.public_id) {
          await cloudinary.uploader.destroy(teamMember.avatar.public_id);
        }
  
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'team_members',
        });
  
        avatar = {
          public_id: result.public_id,
          url: result.secure_url,
        };
  
        fs.unlinkSync(req.file.path);
      }
  
      teamMember = await TeamMember.findByIdAndUpdate(
        id,
        { ...req.body, avatar },
        { new: true, runValidators: true }
      );
  
      res.status(200).json({ message: 'Team member updated successfully', teamMember });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

// Delete a Team Member
exports.deleteTeamMember = async (req, res, next) => {
    try {
        const deletedTeamMember = await TeamMember.findByIdAndDelete(req.params.id);
        if (!deletedTeamMember) {
            return next(new ErrorHandler('Team member not found', 404));
        }
    if (deletedTeamMember.avatar?.public_id) {
        await cloudinary.uploader.destroy(deletedTeamMember.avatar.public_id);
      }
        res.status(200).json({ message: 'Team member deleted successfully' });
    } catch (err) {
        next(new ErrorHandler('Error deleting team member', 400));
    }
};
