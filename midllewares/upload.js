const path = ("path")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function(req, res, cb){
        cb(null, "/upload") 
    },
    filename: function(req, file, cb){
        let ext = path
    }
})