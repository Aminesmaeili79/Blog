const fs = require('fs').promises;
const mo = require('./mathOperations.js')
const EventEmitter = require('events');
const express = require('express');

// fs.readFile('test1.txt', 'utf-8', (err, data) => {
//     console.log(data)
// })
// fs.readFile('test2.txt', 'utf-8', (err, data) => {
//     console.log(data)
// })
// fs.readFile('test3.txt', 'utf-8', (err, data) => {
//     console.log(data)
// })

// fs.readFile('test1.txt', 'utf-8')
// .then(r => console.log(r))
//     .catch(e => console.log('failed to read file.'))
// .finally(() => {
//     console.log('finished')
// })

// console.log(mo.add(2, mo.multiply(3, mo.add(2, 6))))

// class newEmitter extends EventEmitter {}
// const ne = new EventEmitter();
//
// ne.on('timer', () => {
//     let tick = 1;
//     const interval = setInterval(() => {
//         console.log(`tick ${tick}`)
//         if (tick === 5) clearInterval(interval)
//     }, 1000)
// })
//
// ne.emit('timer')


//
// app.use('/', express.static('./'))
// express.static('./img')
//
// app.get('/', (req, res) => {
// })
//
// let tasks = ['take out trash',]
//
// app.get('/tasks', (req, res) => {
//     res.send(tasks)
// })
//
// app.get('/tasks/:id', (req, res) => {
//     const id = req.params.id;
//     if (id >= 0 && id < tasks.length) {
//         res.send(tasks[id]);
//     } else {
//         res.status(404).send({ error: 'Task not found' });
//     }
// });
//
// app.post('/tasks', (req, res) => {
//     tasks.push(req.body.task)
//     res.send(tasks)
// })
//
// app.patch('/tasks/:id', (req, res) => {
//     const id = req.params.id;
//     if (id >= 0 && id < tasks.length) {
//         tasks[id] = req.body.task;
//         res.send(tasks[id]);
//     } else {
//         res.status(404).send({ error: 'Task not found' });
//     }
// })
//
// app.delete('/tasks/:id', (req, res) => {
//     const id = req.params.id;
//     res.send(tasks.splice(id ,1))
// })
//
//

const app = express()
const port = 8080;
app.use(express.json());
const mongoose = require('mongoose')
const connection = 'mongodb://127.0.0.1:27017'

// mongoose.connect(connection)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('MongoDB connection error:', err));
//
//
//
// const taskSchema = new mongoose.Schema({
//     title: {type: String, required: true},
//     completed: {type: Boolean, required: false}
// })
//
// const Task = mongoose.model('Task', taskSchema)
//
// app.get('/tasks', async (req, res) => {
//     const task = await Task.find();
//     res.json(task);
// })
//
// app.post('/tasks', (req, res) => {
//     try {
//         const task = new Task({ title: req.body.title })
//         const saved = task.save();
//         res.status(201).json(saved);
//     }
//     catch (err) {
//         res.status(400).json({ error: err })
//     }
// })
//
// app.listen(port, () => {
//     console.log(`Listening on port ${port}`)
// })

