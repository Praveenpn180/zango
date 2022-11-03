const path = require('path')
const morgan = require('morgan')
const express = require('express') 
const app = express();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

app.use(express.json());
app.use(morgan('dev'));


const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, '/src/my-images');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname);
  }
});

module.exports = {upload}