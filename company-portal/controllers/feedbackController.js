
const Feedback = require('../models/Feedback'); 


exports.createFeedback = async (req, res) => {
  try {
    const {
      name,
      email,
      rating,
      service,
      improve,
      recommend,
      additional,
    } = req.body;

    const newFeedback = new Feedback({
      name,
      email,
      rating,
      service,
      improve,
      recommend,
      additional,
    });


    await newFeedback.save();

    res.status(201).json({
      message: 'Feedback submitted successfully',
      feedback: newFeedback,
    });
  } catch (error) {
  
    res.status(500).json({
      message: 'Error saving feedback',
      error: error.message,
    });
  }
};

exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find(); 
    res.status(200).json(feedbacks); 
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching feedbacks',
      error: error.message,
    });
  }
};


// Delete a feedback entry
exports.deleteFeedback = async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!deletedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (err) {
    console.error('Error deleting feedback:', err);
    res.status(500).json({ message: 'Error deleting feedback', error: err.message });
  }
};
