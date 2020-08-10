const handler = require('../backend/company/company_handler');
let router = require('express').Router();

router.post('/', handler.insertCompany);
router.get('/:branch_srl', handler.getCompany);
router.get('/warranty/:company_srl', handler.getWarranty);

module.exports = router;
