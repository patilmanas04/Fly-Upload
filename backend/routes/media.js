require('dotenv').config();
const express = require('express');
const cloudinary = require('cloudinary').v2;
const router = express.Router();
const Media = require('../models/Media');
const fetchUserDetails = require('../middleware/fetchUser');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})

router.post('/upload', fetchUserDetails, upload.single('file'), async (req, res) => {
    try{
        const { title, mediaType, mediaSize } = req.body;

        const filePath = req.file.path;

        const imageUploadOptions = {
            folder: 'images',
            resource_type: 'image'
        }

        const videoUploadOptions = {
            folder: 'videos',
            resource_type: 'video',
            transformation: {
                video: {
                    codec: 'h264',
                    bitrate: '64k',
                }
            }
        }

        const result = await cloudinary.uploader.upload(filePath, mediaType==="image"?imageUploadOptions:videoUploadOptions);

        fs.unlinkSync(filePath);

        const mediaLink = result.secure_url;

        const savedMedia = await Media.create({
            user: req.user.id,
            title: title,
            mediaType: mediaType,
            mediaLink: mediaLink,
            mediaSize: `${((result.bytes)/(1024*1024)).toFixed(2)} MB`,
        })

        res.json(savedMedia)
    }
    catch(error){
        console.log(error)
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

router.delete('/deletemedia/:id', fetchUserDetails, async (req, res) => {
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
    
        const mediaLink = media.mediaLink
        const mediaType = media.mediaType
        const mediaName = mediaLink.split('/').pop().split('.').shift()

        const result = await cloudinary.uploader.destroy(`${mediaType==="image"?"images":"videos"}/${mediaName}`, {
            resource_type: mediaType
        })

        if(result.result !== 'ok'){
            return res.status(500).json({
                error: "Internal Server Error",
                message: "Error deleting media from cloudinary"
            })
        }

        const deletedMedia = await Media.findByIdAndDelete(id)
    
        res.json({
            message: "Media deleted successfully",
            deletedMedia: deletedMedia,
            cloudinaryResponse: result
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