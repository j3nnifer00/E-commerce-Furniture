/* const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

// AWS S3 설정
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'serene-spaces-react/ProductImages',
        acl: 'public-read', // 퍼블릭 읽기 권한 설정
        key: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        }
    }),
    fileFilter: fileFilter
}); */


const path = require('path');
const multer = require('multer');

// Multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "./public/ProductImages");
    },
    filename: function(req, file, cb) {
        
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        return cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.'), false);
    }
};


const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});


module.exports = upload;
