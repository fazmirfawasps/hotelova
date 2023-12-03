const multer = require('multer')
require('dotenv').config()



const itemStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const itemUpload = multer({ storage: itemStorage });

module.exports={itemUpload}