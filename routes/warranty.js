const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: "AKIAWHWCQKTRKHBBAOBZ",
    secretAccessKey: "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"
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "react-smms", // 버킷 이름
        acl: 'public-read', // 클라이언트에서 자유롭게 가용하기 위함
        key: (req, file, cb) => {
            cb(null, "warranty/" + file.originalname)
        },
    })
});

const handler = require('../backend/warranty/warranty_handler');
let router = require('express').Router();

router.get('/img/:warranty_srl', handler.getImage);
router.get('/:warranty_srl', handler.getWarranty);
router.get('/operation/:warranty_srl', handler.getOperation);
router.post('/:warranty_srl', handler.updateWarranty);
router.post('/img/:warranty_srl', upload.single('userfile'), handler.uploadImage);

module.exports = router;
