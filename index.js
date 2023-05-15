const {login, verifyToken} = require('./auth');
// const verifyToken = require('./auth');

const express = require('express')
const cors = require('cors');
const helmet = require('helmet');
const csp = require('helmet-csp');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express()
const port = 5000

const corsOptions = {
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true
  }

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", 'http://localhost:5000']
    }
}));


let clothes = [
    {
      id: 1,
      image: "https://www.muji.com/wp-content/uploads/sites/12/2021/02/026.jpg",
      name: "Blue T-shirt",
      price: 20.99,
      category: "T-shirts"
    },
    {
      id: 2,
      image: "https://cdn.hellodd.com/news/photo/201909/69577_craw1.jpg",
      name: "Black Jeans",
      price: 50.00,
      category: "Jeans"
    },
    {
      id: 3,
      image: "https://www.muji.com/wp-content/uploads/sites/12/2021/02/036.jpg",
      name: "Red Dress",
      price: 80.00,
      category: "Dresses"
    },
    {
        id: 4,
        image: "https://www.muji.com/wp-content/uploads/sites/12/2021/02/026.jpg",
        name: "Blue T-shirt",
        price: 20.99,
        category: "T-shirts"
    },
    {
        id: 5,
        image: "https://cdn.hellodd.com/news/photo/201909/69577_craw1.jpg",
        name: "Black Jeans",
        price: 50.00,
        category: "Jeans"
    },
    {
        id: 6,
        image: "https://www.muji.com/wp-content/uploads/sites/12/2021/02/036.jpg",
        name: "Red Dress",
        price: 80.00,
        category: "Dresses"
    },
    {
        id: 7,
        image: "https://www.muji.com/wp-content/uploads/sites/12/2021/02/026.jpg",
        name: "Blue T-shirt",
        price: 20.99,
        category: "T-shirts"
    },
    {
        id: 8,
        image: "https://cdn.hellodd.com/news/photo/201909/69577_craw1.jpg",
        name: "Black Jeans",
        price: 50.00,
        category: "Jeans"
    },
    {
        id: 9,
        image: "https://www.muji.com/wp-content/uploads/sites/12/2021/02/036.jpg",
        name: "Red Dress",
        price: 80.00,
        category: "Dresses"
    },
    {
        id: 10,
        image: "https://www.muji.com/wp-content/uploads/sites/12/2021/02/026.jpg",
        name: "Blue T-shirt",
        price: 20.99,
        category: "T-shirts"
    },
    {
        id: 11,
        image: "https://cdn.hellodd.com/news/photo/201909/69577_craw1.jpg",
        name: "Black Jeans",
        price: 50.00,
        category: "Jeans"
    },
    {
        id: 12,
        image: "https://www.muji.com/wp-content/uploads/sites/12/2021/02/036.jpg",
        name: "Red Dress",
        price: 80.00,
        category: "Dresses"
    },
  ];
  
  // GET /clothes - 모든 옷 항목 반환
  app.get('/clothes', (req, res) => {
    res.json(clothes);
  });
  
  // GET /clothes/:id - 특정 옷 항목 반환
  app.get('/clothes/:id', (req, res) => {
    const id = Number(req.params.id);
    const cloth = clothes.find(cloth => cloth.id === id);
    if (cloth) {
      res.json(cloth);
    } else {
      res.status(404).json({ error: "Cloth not found" });
    }
  });
  
  // POST /clothes - 새로운 옷 항목 추가
  app.post('/clothes', (req, res) => {
    const { image, name, price, category } = req.body;
    console.log(req.body);
  
    if (image && name && price && category) {
      const newCloth = { id: clothes.length + 1, image, name, price, category };
      clothes.push(newCloth);
      res.json(newCloth);
    } else {
      res.status(400).json({ error: "Invalid data" });
    }
  });
  
  // PATCH /clothes/:id - 특정 옷 항목 수정
  app.patch('/clothes/:id', (req, res) => {
    const id = Number(req.params.id);
    const { image, name, price, category } = req.body;
    console.log(id, image, name, price, category);
  
    const index = clothes.findIndex(cloth => cloth.id === id);
    if (index !== -1 && image && name && price && category) {
      clothes[index].image = image;
      clothes[index].name = name;
      clothes[index].price = price;
      clothes[index].category = category;
      res.json(clothes[index]);
    } else if (index === -1) {
      res.status(404).json({ error: "Cloth not found" });
    } else {
      res.status(400).json({ error: "Invalid data" });
    }
  });
  
  app.post('/login', login);

app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: '인증 성공', user: req.user });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
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


/**
 * id(key)
 * 사진
 * 의류이름
 * 가격
 * 카테고리
 * --상세정보--
 * 
 */