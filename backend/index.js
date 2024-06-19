const connectToMongoDB = require('./database')
const express = require('express')
const cors = require('cors')

connectToMongoDB()
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use('/api/auth', require('./routes/auth'))

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})