const db = require('pg').Pool;

const pool = new db({
	user:'smms',
	host:'52.78.174.158',
	database: 'smms',
	password: 'smms',
	port: 5432
});

const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['./backend/warranty/warranty_query.xml']);

const format = {language: 'sql', indent: '	'}


const getImage = (req, res) => {
    let param = {warranty_srl : req.params.warranty_srl};
    query = mybatisMapper.getStatement('warranty', 'getImage',	param, format);
    pool.query(query, (err, ret) => {
		if(err){
			return res.status(500).json({error:'database failure'});
        }
        const imgPath = ret.rows[0].img_path;
		return res.redirect(imgPath);
	});
}

const getWarranty = (req, res) => {
    let param = {warranty_srl : req.params.warranty_srl};
    query = mybatisMapper.getStatement('warranty', 'getWarranty',	param, format);
    pool.query(query, (err, ret) => {
		if(err){
			return res.status(500).json({error:'database failure'});
        }
        return res.status(200).json(ret.rows[0]);
	});
}

const getOperation = (req, res) => {
    const warranty_srl = req.params.warranty_srl;
    const { start_y, start_m, start_d, finish_y, finish_m, finish_d } = req.query;
    console.log(req.query);
    const start = start_y + "-" + start_m + "-" + start_d + " 00:00:00";
    const finish = finish_y + "-" + finish_m + "-" + finish_d + " 23:59:59";
    let param = {
        warranty_srl : warranty_srl,
        start : start,
        finish : finish
    };

    query = mybatisMapper.getStatement('warranty', 'getOperation',	param, format);
    pool.query(query, (err, ret) => {
		if(err){
			return res.status(500).json({error:'database failure'});
        }
        return res.status(200).json({list:ret.rows});
	});

}

const updateWarranty = (req, res) => {
    let param = {warranty_srl : req.params.warranty_srl, name : req.body.warranty_nm};
    query = mybatisMapper.getStatement('warranty', 'updateWarranty',	param, format);
    pool.query(query, (err, ret) => {
		if(err){
			return res.status(200).json({is_success:false});
        }
        return res.status(200).json({is_success:true});
	});
}

const uploadImage = (req, res) => {
    let param = {warranty_srl : req.params.warranty_srl, img_path : req.file.location};
    query = mybatisMapper.getStatement('warranty', 'updateImgPath',	param, format);
    pool.query(query, (err, ret) => {
		if(err){
			return res.status(200).json({is_success:false});
        }
        return res.status(200).json({is_success:true});
	});
}

module.exports = {
    getImage,
    getWarranty,
    getOperation,
    updateWarranty,
    uploadImage
}