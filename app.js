const express = require('express');
const path = require('path');
const app = express();
const portt = 3000;
// const jwt = require('jsonwebtoken');
const session = require('express-session');

//SESSION
app.use(session({

	// It holds the secret key for session
	// secret: 'Your_Secret_Key',
    secret: 'keyboard cat',  maxAge: 60000,
	// Forces the session to be saved
	// back to the session store
	resave: true,

	// Forces a session that is "uninitialized"
	// to be saved to the store
	saveUninitialized: true
}));


//POST REQ
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));


// const mysql = require('mysql');
// //CREATE CONNECTION
// const db = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'mirzabaig',
//     database : 'mydb'
//   });

// //CONNECT
// db.connect((err, res)=>{
//     if(err) throw err;
//     else
//     console.log("Database connected!!!!");
// });

const port = process.env.PORT || 5000;
//EXPRESS RELATED STUFF
app.use('/static',express.static('static'));// for serving static files
app.use(express.urlencoded({ extended: true }));



// PUG RELATED STUFF
app.set('view engine', 'pug');// set template engine pug
app.set('views', path.join(__dirname, 'views'));// set views directory 
//DATABASE




// END POINTS 
app.get('/', (req, res)=>{
        res.sendFile(path.join(__dirname+'/views/home.html'));
});

app.get('/logout', (req, res)=>{
    res.redirect('/');
})

app.get('/newAcc', (req, res)=>{
    res.sendFile(path.join(__dirname+'/views/register.html'))
})

app.post('/login1',(req, res)=>{
    res.sendFile(path.join(__dirname+'/views/issuer.html'));
})

app.post('/login2',(req, res)=>{
    res.sendFile(path.join(__dirname+'/views/issuer.html'));
})

app.get('/login-issuer', (req, res)=>{
    res.sendFile(path.join(__dirname+'/views/loginIssuer.html'));
})

app.get('/login-user', (req, res)=>{
    res.sendFile(path.join(__dirname+'/views/loginUser.html'));
})

app.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname+'/views/issuer.html'));
})

app.post('/signup',(req, res)=>{
    res.redirect('/login');
})














// SERVER 
app.listen(portt, ()=>{
    console.log(`Server running on:${portt}`);
});