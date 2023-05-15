const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateUser(username, password) {
    // 사용자 인증 로직 구현
    if (username === 'test' && password === 'password') {
      return true;
    } else {
      return false;
    }
  }

function login(req, res){    
    const { username, password } = req.body;
    console.log(req.body);
    console.log(process.env.EXPRESS_SECRET);
    
    if (authenticateUser(username, password)) { 
        //토큰발급
      const token = jwt.sign({ username }, process.env.EXPRESS_SECRET);
      res.json({ token });
    } else {
      res.status(401).json({ error: '인증 실패' });
    }
  }

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    console.log('verify:',token);
    
    if (!token) {
        return res.status(401).json({ error: '인증 실패' });
    }

    jwt.verify(token, process.env.EXPRESS_SECRET, (err, decoded) => {
        if (err) {
        return res.status(401).json({ error: '인증 실패' });
        }
        req.user = decoded.username;
        next();
    });
}

module.exports = {
    login, verifyToken
}

/*
로그인
fetch('http://localhost:5000/login', {
    method:"POST",
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
        username:'test', password:'password'
    })
})
 */
/* 인증
fetch('http://localhost:5000/protected',{
    headers:{'authorization':'tokenString'
    }
})

*/

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2ODQxMzQ1MTd9.ZhJJgnmsU52iUC22kUCZa82BhPmw4MYP7Ou9xDxRdWI