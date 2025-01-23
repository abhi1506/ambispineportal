const JobApplication = require('../models/JobApplication'); 
const cloudinary = require("cloudinary").v2; 
const fs = require('fs'); 
const path = require('path'); 

// Create Job Application
exports.createJobApplication = async (req, res) => {
  try {
    const { name, email, phone, experience, education, skills, message,career } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Name, email, and phone are required." });
    }

    let resume = null;

    
    if (req.file) {
      const resumePath = req.file.path;
      const result = await cloudinary.uploader.upload(resumePath, {
        folder: "resumes",
        resource_type: "auto"
      });

      resume = {
        public_id: result.public_id,  
        url: result.secure_url       
      };

    
      if (fs.existsSync(resumePath)) {
        fs.unlinkSync(resumePath);
      }
    }

    
    const skillsArray = typeof skills === 'string' ? skills.split(",").map(skill => skill.trim()) : [];

    const jobApplication = new JobApplication({
      name,
      email,
      phone,
      experience,
      education,
      skills: skillsArray,
      resume: resume,
      message,
      career,
    });

    await jobApplication.save();

    res.status(201).json({ message: "Job application submitted successfully!", jobApplication });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


exports.getAllJobApplications = async (req, res) => {
  try {
    const jobApplications = await JobApplication.find();

    if (!jobApplications || jobApplications.length === 0) {
      return res.status(404).json({ message: "No job applications found." });
    }


    res.status(200).json({ jobApplications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


exports.updateJobApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, experience, education, skills, message } = req.body;

    
    let jobApplication = await JobApplication.findById(id); 

    if (!jobApplication) {
      return res.status(404).json({ message: "Job application not found." });
    }

    let resumeUrl = jobApplication.resume; 

    
    if (req.file) {
      const resumePath = req.file.path;
      const result = await cloudinary.uploader.upload(resumePath, {
        folder: "resumes",
        resource_type: "auto"
      });
      resumeUrl = result.secure_url;

      if (fs.existsSync(resumePath)) {
        fs.unlinkSync(resumePath); 
      }
    }

   
    jobApplication = await JobApplication.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        experience,
        education,
        skills: skills ? skills.split(",").map(skill => skill.trim()) : jobApplication.skills,
        resume: resumeUrl,
        message
      },
      { new: true } 
    );

    res.status(200).json({ message: "Job application updated successfully!", jobApplication });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.deleteJobApplication = async (req, res) => {
  try {
    const jobApplication = await JobApplication.findById(req.params.id);

    if (!jobApplication) {
      return res.status(404).json({ error: 'Job application not found' });
    }

    if (jobApplication.resume && jobApplication.resume.public_id) {
      await cloudinary.uploader.destroy(jobApplication.resume.public_id, { resource_type: 'raw' }); 
    }


    await JobApplication.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Job application and resume deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};




