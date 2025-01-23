const Content = require('../models/content');

exports.createContentMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        
        const newContent = new Content({
            name,
            email,
            message
        });

       
        await newContent.save();

        return res.status(201).json({
            success: true,
            message: "Content message submitted successfully",
            data: newContent
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

exports.getAllContentMessages = async (req, res) => {
    try {
        const contents = await Content.find(); 

        return res.status(200).json({
            success: true,
            message: "Content messages retrieved successfully",
            data: contents
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

exports.deleteContentMessage = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedContent = await Content.findByIdAndDelete(id);

        if (!deletedContent) {
            return res.status(404).json({
                success: false,
                message: "Content message not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Content message deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};
