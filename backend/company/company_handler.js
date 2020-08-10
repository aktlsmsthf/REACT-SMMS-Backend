const db = require('pg').Pool;
const pool = new db({
	user:'smms',
	host:'52.78.174.158',
	database: 'smms',
	password: 'smms',
	port: 5432
});

const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['./backend/company/company_query.xml']);

const format = {language: 'sql', indent: '	'}

const insertCompany = (req, res) => {
    const { branch_srl, company_nm, zonecode, full_address, address, phone, warranty_list } = req.body;

	let param = {
        branch_srl : branch_srl,
        name : company_nm,
        zonecode : zonecode,
        addr : full_address,
        addr_detail : address,
        phone : phone
    };
    let query = mybatisMapper.getStatement('company', 'insertCompany',	param, format);
   
	pool.query(query, (err, ret) => {
		if(err){
			return res.status(200).json({is_success:false});
        }

        query = mybatisMapper.getStatement('company', 'selectCompany',	param, format);
        pool.query(query, (err, ret) => {
            if(err){
                return res.status(200).json({is_success:false});
            }
            const company_srl = ret.rows[0].company_srl;

            const request = require('request');
            request({
                url : "https://dapi.kakao.com/v2/local/search/address.json?query=" + encodeURIComponent(full_address + " " + address),
                headers : {"Authorization" : "KakaoAK 32dc3280e82aad26b2dc5af618a47a31"}
            }, function(err, response, body){
                body = JSON.parse(body);
                let lat = Number(body.documents[0].address.y);
                let lng = Number(body.documents[0].address.x);
                
                for(let i=0; i<warranty_list.length; i++){
                    let r = Math.random();
                    let rank = "A";
                    if(r<0.33){
                        rank = "B";
                    }
                    else if(r<0.6){
                        rank = "C";
                    }
                    param = {
                        company_srl : company_srl,
                        name : warranty_list[i].warranty_nm,
                        rank : rank,
                        lat : lat + 0.001 * (Math.random() - 1),
                        lng : lng + 0.001 * (Math.random() - 1)
                    };
                    query = mybatisMapper.getStatement('company', 'insertWarranty',	param, format);
                    pool.query(query, (err, ret)=> {

                    });
                }
                res.status(200).json({is_success : true});
            });

            
        });

		
	});
}

const getCompany = (req, res) => {
    let param = {branch_srl : req.params.branch_srl};
    query = mybatisMapper.getStatement('company', 'getCompany',	param, format);
    pool.query(query, (err, ret)=>{
        if(err){
			return res.status(500).json({error:'database failure'});
        }
        return res.status(200).json(ret.rows);
    })
}

const getWarranty = (req, res) => {
    let param = {company_srl : req.params.company_srl};
    query = mybatisMapper.getStatement('company', 'getWarranty',	param, format);
    pool.query(query, (err, ret)=>{
        if(err){
			return res.status(500).json({error:'database failure'});
        }
        return res.status(200).json(ret.rows);
    }) 
}

module.exports = {
    insertCompany,
    getCompany,
    getWarranty
}
