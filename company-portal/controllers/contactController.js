const Contact = require('../models/Contact');

exports.createContactMessage = async (req, res) => {
    try {
        const { name, email_or_phone, company, position, message } = req.body;

        
        const newContact = new Contact({
            name,
            email_or_phone,
            company,
            position,
            message
        });

       
        await newContact.save();

        return res.status(201).json({
            success: true,
            message: "Contact message submitted successfully",
            data: newContact
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

exports.getAllContactMessages = async (req, res) => {
    try {
        const contacts = await Contact.find(); 

        return res.status(200).json({
            success: true,
            message: "Contact messages retrieved successfully",
            data: contacts
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

exports.deleteContactMessage = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return res.status(404).json({
                success: false,
                message: "Contact message not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Contact message deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};
