const morgan = require('morgan')
const express = require('express') 
const app = express();
const multer = require('multer');
//const multerStorage = multer.memoryStorage()

//

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

//


app.use(express.json());
app.use(morgan('dev'));


const multerFilter = (req, file, cb) => {
  //check file type
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    //rejected files
    cb(
      {
        message: "Unsupported file format",
      },
      false
    );
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits:{fileSize:1000000}
})
module.exports = {upload}



