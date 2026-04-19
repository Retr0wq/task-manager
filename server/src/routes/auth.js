const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../database')

const router = express.Router()

router.post('/register', (req, res) => {
    const { name, email, password } = req.body

    const ex = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
    if (ex) {
        return res.status(400).json({ error: 'ja existe' })
    }

    const crs = bcrypt.hashSync(password, 10)

    const result = db
        .prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)')
        .run(name, email, crs)

    res.status(201).json({ message: 'Um Sucesso!', userId: result.lastInsertRowid })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
    if (!user) {
        return res.status(401).json({ error: 'tentar denovo' })
    }

    const pmatch = bcrypt.compareSync(password, user.password)
    if (!pmatch) {
        return res.status(401).json({ error: 'tentar denovo' })
    }

    const token = jwt.sign(
        { userId: user.id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )

    res.json({ token, name: user.name })
})

module.exports = router