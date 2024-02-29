import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) { //telling where to store the files in server
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {  //changing the file name from what we recived from client
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  export const upload = multer({ 
    storage,
 })