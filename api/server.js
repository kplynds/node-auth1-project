const express = require("express")
const cors = require("cors")

const server = express()
server.use(express.json())
server.use(cors())

const router = require("./auth/auth-router")
const db = require("../data/dbConfig")

server.get("/", (req, res) => {
  res.status(200).json("You did it!")
})

server.get("/api/users", (req, res) => {
    db('users').then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(500).json( { message: err.message })
    })
})

server.use('/api/auth', router)

module.exports = server