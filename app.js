const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

app.set('view engine', 'jade');

const port = process.env.port||8080;

app.get('/', (req, res)=>{
	res.end("hello world");
})

app.use('/home', require('./routes/home'));
app.use('/company', require('./routes/company'));
app.use('/warranty', require('./routes/warranty'));

app.get('/upload', function(req, res){
	res.render('upload');
  });

var server = app.listen(port, ()=>{
	console.log("server on");
})
