import multer from 'multer';

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("upload util")
        console.log(file);
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        console.log(file);
        //cb(null, `${Date.now()}-${file.originalname}`) este sería por fechas, repite imagenes
        cb(null, `${file.originalname}`) // si dos imagenes se llaman igual, se sobreescriben
    }
})
 let upload = multer({ storage: storage });


export default {
    storage,
    upload
}