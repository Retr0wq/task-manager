const express = require('express');
const cors =  require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth')
const router = require("./routes/auth");
const tasksRoutes = require('./routes/tasks')
const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);
app.get ('/ping', (req, res) => {
    res.json({message: 'BELEZA!'});
})

const PORT = process.env.PORT || 6767
app.listen(PORT, () => {
    console.log(`Sou todo ouvidos ${PORT}`);
})