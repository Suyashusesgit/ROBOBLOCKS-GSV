const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|pdf|zip|rar|7z/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Mime check often fails for zips in some envs, rely on ext or allow 'application/octet-stream'

    if (extname) {
        return cb(null, true);
    } else {
        cb('Error: Images, PDFs, or Archives (zip/rar) Only!');
    }
}

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // 10MB limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

module.exports = upload;
