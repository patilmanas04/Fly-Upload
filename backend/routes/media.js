const express = require('express');
const router = express.Router();
const Media = require('../models/Media');
const fetchUserDetails = require('../middleware/fetchUser');

router.post('/upload', fetchUserDetails, async (req, res) => {
    try{
        const { title, mediaType, mediaLink, mediaSize } = req.body;

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