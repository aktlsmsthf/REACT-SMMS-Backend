const db = require('pg').Pool;
const pool = new db({
	user:'smms',
	host:'52.78.174.158',
	database: 'smms',
	password: 'smms',
	port: 5432
});

const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['./backend/home/home_query.xml']);

const format = {language: 'sql', indent: '	'}

const getRank = (req, res) => {
	let param = {branch_srl : req.params.branch_srl};
	let query = mybatisMapper.getStatement('home', 'getRank',	param, format);
	pool.query(query, (err, ret) => {
		if(err){
			return res.status(500).json({error:'database failure'});
		}
		return res.status(200).json(ret.rows);
	});
}

const getMap = (req, res) => {
	let param = {branch_srl : req.params.branch_srl};
	let query = mybatisMapper.getStatement('home', 'getMap',	param, format);
	pool.query(query, (err, ret) => {
		if(err){
			return res.status(500).json({error:'database failure'});
		}
		return res.status(200).json(ret.rows);
	});
}

const getWarranty = (req, res) => {
	let param = {branch_srl : req.params.branch_srl, limit : req.query.limit, offset : req.query.offset};
	let query = mybatisMapper.getStatement('home', 'getWarranty',	param, format);
	pool.query(query, (err, ret) => {
		if(err){
			return res.status(500).json({error:'database failure'});
		}
		return res.status(200).json(ret.rows);
	});
}

module.exports = {
	getRank,
	getMap,
	getWarranty
}
