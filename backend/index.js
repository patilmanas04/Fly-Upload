const connectToMongoDB = require('./database')
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')

connectToMongoDB()
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 50MB
    safeFileNames: true,
    preserveExtension: true,
    createParentPath: true,
    abortOnLimit: true,
    responseOnLimit: 'File size limit has been reached'
}))

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/media', require('./routes/media'))

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})