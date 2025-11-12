const multer = require('multer');
const fs = require('fs');
const path = require('path');
const appError = require('../utils/appError.js');

// Ensure upload directory exists
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Disk storage
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    console.log("file:", file.mimetype);
    const ext = file.mimetype.split('/')[1];
    const filename = `user-${Date.now()}.${ext}`;
    cb(null, filename);
  },
});

const photoFilter = (req, file, cb) => {
  const type = file.mimetype.split('/')[0];
  if (type === 'image') {
    cb(null, true);
  } else {
    cb(appError.create('Only image files are allowed!' , 500), false);
  }
};

const pdfFilter = (req, file, cb) => {
  const ext = file.mimetype.split('/')[1];
  if (ext === 'pdf') {
    cb(null, true);
  } else {
    cb(appError.create('Only Pdf files are allowed!',500), false);
  }
};

// Upload middlewares
const uploadImage = multer({ storage: diskStorage, fileFilter: photoFilter });
const uploadPdf = multer({ storage: diskStorage, fileFilter: pdfFilter });

module.exports = { uploadImage, uploadPdf };
