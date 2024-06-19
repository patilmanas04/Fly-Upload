require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fetchUserDetails = require('../middleware/fetchUser')
const JWT_PRIVATE_KEY = process.env.JWT_SECRET;

router.post('/register', [
    body('username', "Enter a valid username")
    .notEmpty()
    .isLength({min: 3})
    .custom(username => !/\s/.test(username)),
    body('password', "Password must be at least 8 characters long").isLength({min: 8})
], async(req, res) => {
    let success = false

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()})
    }
    
    try{
        let user = await User.findOne({username: req.body.username})
        if(user){
            return res.status(400).json({success, message: "User already exists"})
        }

        const {username, password} = req.body
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        user = await User.create({
            username,
            password: hashedPassword
        })

        const payload = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(payload, JWT_PRIVATE_KEY)

        success = true
        res.json({success, message: "User registered successfully"})
    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({success, authToken, message: "Internal Server Error"})
    }
})

router.post('/login', [
    body('username', "Enter a valid username")
    .notEmpty()
    .isLength({min: 3})
    .custom(username => !/\s/.test(username)),
    body('password', "Password must be at least 8 characters long").isLength({min: 8})
], async(req, res) => {
    let success = false

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()})
    }

    try{
        const {username, password} = req.body
    
        const user = await User.findOne({username})
        if(!user){
            return res.status(400).json({success, message: "Invalid login credentials"})
        }
    
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if(!isPasswordMatched){
            return res.status(400).json({success, message: "Invalid login credentials"})
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(payload, JWT_PRIVATE_KEY)

        success = true
        res.json({success, authToken, message: "User logged in successfully"})
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({success, message: "Internal Server Error"})
    }
})

router.post("/getuser", fetchUserDetails, async(req, res) => {
    try{
        const userId = req.user.id
        const userDetails = await User.findById(userId).select("-password")

        res.json({success: true, userDetails: userDetails})
    }
    catch(error){
        res.status(500).json({success: false, error: "Error occurred"})
    }
})

module.exports = router