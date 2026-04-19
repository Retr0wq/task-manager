const express = require('express')
const db = require('../database')
const authmiddleware = require('../middleware/auth')

const router = express.Router()
router.use(authmiddleware)

router.get('/', (req, res) => {

    const tasks = db
        .prepare('SELECT * FROM tasks WHERE user_id = ?')
        .all(req.user)
    res.json(tasks)
})

router.post('/', (req, res) => {

    const { title } = req.body
    const result = db
        .prepare('INSERT INTO tasks (title, user_id) VALUES (?, ?)')
        .run(title, req.user)
    res.status(201).json({ message: 'criada', taskId: result.lastInsertRowid })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const { title, done } = req.body
    db.prepare('UPDATE tasks SET title = ?, done = ? WHERE id = ? AND user_id = ?')
        .run(title, done ? 1 : 0, id, req.user)
    res.json({ message: 'atualizada' })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    db.prepare('DELETE FROM tasks WHERE id = ? AND user_id = ?')
        .run(id, req.user)
    res.json({ message: 'deletada' })
})

module.exports = router