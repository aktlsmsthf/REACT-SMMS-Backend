const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const port = process.env.port||8080;

app.get('/', (req, res)=>{
	res.end("hello world");
})

app.use('/home', require('./routes/home'));
app.use('/company', require('./routes/company'));

var server = app.listen(port, ()=>{
	console.log("server on");
})
