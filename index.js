const express = require('express')
const cors = require('cors');
const helmet = require('helmet');
const csp = require('helmet-csp');
const app = express()
const port = 5000

const corsOptions = {
    origin: (origin, callback) => {
      // if (whitelist.indexOf(origin) !== -1) {
      //   callback(null, true)
      // } else {
      //   callback(new Error('Not allowed by CORS'))
      // }
      callback(null, true);
    },
    credentials: true
  }

app.use(cors(corsOptions));
app.use(express.json());

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", 'http://localhost:5000']
    }
}));


let todos = [
  { id: 1, text: 'Buy milk' },
  { id: 2, text: 'Do laundry' },
  { id: 3, text: 'Clean house' },
]

// GET /todos - 모든 todo 항목 반환
app.get('/todos', (req, res) => {
res.json(todos);
});

// GET /todos/:id - 특정 todo 항목 반환
app.get('/todos/:id', (req, res) => {
    const id = Number(req.params.id);
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({ error: "Todo not found" });
    }
});

// POST /todos - 새로운 todo 항목 추가
app.post('/todos', (req, res) => {
    const { text } = req.body;
    console.log(req.body);
    
    if (text) {
        const newTodo = { id: todos.length + 1, text };
        todos.push(newTodo);
        res.json(newTodo);
    } else {
        res.status(400).json({ error: "Invalid data" });
    }
});

// PATCH /todos/:id - 특정 todo 항목 수정
app.patch('/todos/:id', (req, res) => {
    const id = Number(req.params.id);
    const { text } = req.body;
    console.log(id,text);
    
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1 && text) {
        todos[index].text = text;
        res.json(todos[index]);
    } else if (index === -1) {
        res.status(404).json({ error: "Todo not found" });
    } else {
        res.status(400).json({ error: "Invalid data" });
    }
});
/*
fetch('http://localhost:5000/todos/1',{
    method:'PATCH',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        text:'new',
    })
})
.then(res => res.json())
.then((h)=>console.log(h));
 */
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})