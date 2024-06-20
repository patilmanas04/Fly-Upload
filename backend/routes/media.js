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
        console.log(error.message)
        res.status(500).json({
            error: "Internal Server Error",
            message: error.message
        })
    }
})

module.exports = router