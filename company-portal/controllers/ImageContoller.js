const Image = require('../models/Image');
const cloudinary = require('cloudinary').v2;

/**
 * Upload an image and save its metadata
 */
const uploadImage = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const file = req.files.image;

    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "uploads",
    });

    // Save image metadata to the database
    const image = new Image({
      url: uploadResult.secure_url,
      tags: req.body.tags ? req.body.tags.split(",") : [], // Split tags by comma
    });

    await image.save();

    res.status(201).json({
      message: "Image uploaded and saved successfully",
      image,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Image upload failed", error });
  }
};

/**
 * Get all images
 */
const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ message: "Failed to fetch images", error });
  }
};

/**
 * Get an image by ID
 */
const getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.status(200).json(image);
  } catch (error) {
    console.error("Error fetching image by ID:", error);
    res.status(500).json({ message: "Failed to fetch image", error });
  }
};

/**
 * Delete an image by ID
 */
const deleteImageById = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Delete image from Cloudinary
    const publicId = image.url.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(publicId);

    // Remove image document from database
    await Image.findByIdAndDelete(id);

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Failed to delete image", error });
  }
};

module.exports = {
  uploadImage,
  getAllImages,
  getImageById,
  deleteImageById,
};
