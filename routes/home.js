const handler = require('../backend/home/home_handler');
let router = require('express').Router();

router.get('/rank/:branch_srl', handler.getRank);
router.get('/map/:branch_srl', handler.getMap);
router.get('/warranty/:branch_srl', handler.getWarranty);

module.exports = router;
