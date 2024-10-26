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
