require('dotenv').config();
const express = require('express');
const cloudinary = require('cloudinary').v2;
const router = express.Router();
const Media = require('../models/Media');
const fetchUserDetails = require('../middleware/fetchUser');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})

router.post('/upload', fetchUserDetails, async (req, res) => {
    try{
        const { title, mediaType, mediaSize } = req.body;

        const file = req.files.file
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: mediaType === 'image' ? 'images' : 'videos',
        });

        const mediaLink = result.secure_url;

        const savedMedia = await Media.create({
            user: req.user.id,
            title: title,
            mediaType: mediaType,
            mediaLink: mediaLink,
            mediaSize: mediaSize
        })

        res.json(savedMedia)
    }
    catch(error){
        res.status(500).json({
            error: "Internal Server Error",
            message: error.message
        })
    }
})

router.get('/getmedia', fetchUserDetails, async(req, res) => {
    try{
        const media = await Media.find({
            user: req.user.id
        })

        res.json(media)
    }
    catch(error){
        res.status(500).json({
            error: "Internal Server Error",
            message: error.message
        })
    }
})

router.delete('/delete/:id', fetchUserDetails, async (req, res) => {
    try{
        const id = req.params.id
        const media = await Media.findById(id)
    
        if(!media){
            return res.status(404).json({
                error: "Media not found"
            })
        }
    
        if(media.user.toString() !== req.user.id){
            return res.status(401).json({
                error: "Unauthorized access!!"
            })
        }
    
        const deletedMedia = await Media.findByIdAndDelete(id)
    
        res.json({
            message: "Media deleted successfully",
            deletedMedia: deletedMedia
        })
    }
    catch(error){
        res.status(500).json({
            error: "Internal Server Error",
            message: error.message
        })
    }
})

module.exports = router