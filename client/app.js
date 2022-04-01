const express = require("express")
const cors = require("cors")
const path = require("path")

const app = express()

const port = process.env.PORT || 3000

app.use(cors())

// Serve static files
app.use(express.static(path.join(__dirname, 'clientApp', 'build')))

app.get('/', (req, res) => {
    return res.status(200).json({
        status: "success"
    })
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "clientApp/build", "index.html"))
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})