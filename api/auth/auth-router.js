const express = require('express')
const bcrypt = require('bcryptjs')
const db = require('../../data/dbConfig')
const router = express.Router()

router.post('/register', (req, res) => {
    console.log('registering')
    const hash = bcrypt.hashSync(req.body.password, 10) 
    
    const newUser = {
        username: req.body.username,
        password: hash
    }

    db('users').insert(newUser).then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(500).json({ error: err.code })
    })
  })

module.exports = router