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

const getBranch = (req, res) => {
	let param = {};
	let query = mybatisMapper.getStatement('home', 'getBranch',	param, format);
	pool.query(query, (err, ret) => {
		if(err){
			return res.status(500).json({error:'database failure'});
		}
		return res.status(200).json(ret.rows);
	});
}

const getRank = (req, res) => {
	return res.status(200).json({a_rank:130, b_rank:30, c_rank:10});
}

const getMap = (req, res) => {
	return res.status(200).json({list:[{lat:36.5, lng:127, rank:"A"}, {lat:36.0, lng:126.5, rank:"B"}]});
}

const getWarranty = (req, res) => {
	return res.status(200).json({list:[{company_nm:"홍길동 업체", warranty_nm:"홍길똥 담보물"}, {company_nm:"이순신 업체", warranty_nm:"이순신 담보물"}], total: 2});
}

module.exports = {
	getBranch,
	getRank,
	getMap,
	getWarranty
}
