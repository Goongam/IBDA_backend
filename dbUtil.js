const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('testdb.db');

let clothes = [
    {
      id: 0,
      image: "https://www.muji.com/wp-content/uploads/sites/12/2021/02/026.jpg",
      name: "Blue T-shirt",
      price: 20.99,
      category: "T-shirts"
    },
    {
      id: 1,
      image: "https://cdn.hellodd.com/news/photo/201909/69577_craw1.jpg",
      name: "Black Jeans",
      price: 50.00,
      category: "Jeans"
    },
    {
      id: 2,
      image: "https://www.muji.com/wp-content/uploads/sites/12/2021/02/036.jpg",
      name: "Red Dress",
      price: 80.00,
      category: "Dresses"
    },
    {
        id: 3,
        image: "https://www.muji.com/wp-content/uploads/sites/12/2021/02/026.jpg",
        name: "Blue T-shirt",
        price: 20.99,
        category: "T-shirts"
    },
    {
        id: 4,
        image: "https://cdn.hellodd.com/news/photo/201909/69577_craw1.jpg",
        name: "Black Jeans",
        price: 50.00,
        category: "Jeans"
    },
    {
        id: 5,
        image: "https://www.muji.com/wp-content/uploads/sites/12/2021/02/036.jpg",
        name: "Red Dress",
        price: 80.00,
        category: "Dresses"
    },
    {
        id: 6,
        image: "https://www.muji.com/wp-content/uploads/sites/12/2021/02/026.jpg",
        name: "Blue T-shirt",
        price: 20.99,
        category: "T-shirts"
    },
    {
        id: 7,
        image: "https://cdn.hellodd.com/news/photo/201909/69577_craw1.jpg",
        name: "Black Jeans",
        price: 50.00,
        category: "Jeans"
    },
    {
        id: 8,
        image: "https://www.muji.com/wp-content/uploads/sites/12/2021/02/036.jpg",
        name: "Red Dress",
        price: 80.00,
        category: "Dresses"
    },
    {
        id: 9,
        image: "https://www.muji.com/wp-content/uploads/sites/12/2021/02/026.jpg",
        name: "Blue T-shirt",
        price: 20.99,
        category: "T-shirts"
    },
    {
        id: 10,
        image: "https://cdn.hellodd.com/news/photo/201909/69577_craw1.jpg",
        name: "Black Jeans",
        price: 50.00,
        category: "Jeans"
    },
    {
        id: 11,
        image: "https://www.muji.com/wp-content/uploads/sites/12/2021/02/036.jpg",
        name: "Red Dress",
        price: 80.00,
        category: "Dresses"
    },
  ];

  function insertClothes(){

    const stmt = db.prepare(
    `INSERT INTO products (image, name, price, category) VALUES (?, ?, ?, ?);`
    );
    for (let i = 0; i < 10; i++) {
        stmt.run(clothes[i].image, clothes[i].name, clothes[i].price, clothes[i].category);
    }
    stmt.finalize();
  }

  
async function getAllProducts(){

    return new Promise((resolve, reject)=>{

        db.all("SELECT id, image, name, price, category FROM products", (err, rows) => {
            if(err) reject(err);
            resolve(rows);
        });

    })
    
}

async function getProduct(id){
    return new Promise((resolve, reject)=>{
        db.get(`SELECT id, image, name, price, category FROM products where id=${id}`, (err, row) => {
            if(err) reject(err);
            if(!row) reject();
            // console.log('row',row);
            
            resolve(row);
        });
    });
}

async function addProduct({image, name, price, category}){
    return new Promise((resolve, reject)=>{
        const stmt = db.prepare(
            `INSERT INTO products (image, name, price, category) VALUES (?, ?, ?, ?);`
        );
        stmt.run(image, name, price, category);
        stmt.finalize((err)=> reject());
        resolve();
    })   
}

async function updateProduct(id, updateData){
    let baseQurey = 'UPDATE products SET ';
    let setQuery = [];
    let params = [];
    for(const key in updateData){
        if(!updateData[key]) continue; 
        setQuery.push(`${key} = ?`);
        params.push(updateData[key]);
    }
    baseQurey += setQuery.join(', ');
    baseQurey += ` WHERE id = ${id};`;


    return new Promise((resolve, reject)=>{
        const stmt = db.prepare(baseQurey);
        stmt.run(...params);
        stmt.finalize((err)=> reject());

        resolve();
    })
}

async function deleteProduct(id){
    console.log(id);
    
    return new Promise((resolve, reject)=>{
        const stmt = db.prepare(
            `DELETE FROM products WHERE id = ?;`
        );
        stmt.run(id);
        stmt.finalize((err)=>reject());

        resolve();
    })
}

module.exports = {getAllProducts, insertClothes, getProduct, addProduct, deleteProduct, updateProduct};


