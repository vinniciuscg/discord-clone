const express = require("express")
const cors = require("cors")
const path = require("path")

// start app
const app = express()

// Express port
const port = process.env.PORT || 3000
// const db = process.env.DATABASE

// CORS
app.use(cors())

// Serve static files
app.use(express.static(path.join(__dirname, 'clientApp', 'build')))

// Setting up a route for our API
app.get('/', (req, res) => {
    return res.status(200).json({
        status: "success"
    })
})

// Redirect back to index.html if urls do not match
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "clientApp/build", "index.html"))
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})