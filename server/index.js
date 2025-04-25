// const fs = require('fs').promises;
// const EventEmitter = require('events');

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

const express = require('express');
const app = express()
const port = 8080;

const cors = require('cors');
app.use(cors());

app.use(express.json());

const mongoose = require('mongoose')
const connection = 'mongodb://127.0.0.1:27017/blog'

mongoose.connect(connection)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const blogSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    date: {type: String, required: true},
    content: {type: String, required: true}
})

const Blog = mongoose.model('Blog', blogSchema)

app.use('/', express.static('./'))

app.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.post('/blogs', async (req, res) => {
    try {
        const blog = new Blog({
            title: req.body.title,
            author: req.body.author,
            date: new Date().toLocaleDateString(),
            content: req.body.content
        })
        const saved = await blog.save();
        res.status(201).json(saved);
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
})

app.put('/blogs/:id', async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                author: req.body.author,
                date: new Date().toLocaleDateString(),
                content: req.body.content
            },
            { new: true }
        )
        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(updatedBlog);
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
})

app.delete('/blogs/:id', async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

        if (!deletedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.json({ message: "Blog deleted successfully!"});
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})