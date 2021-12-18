import multer from 'multer';

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("upload util")
        console.log(file);
        cb(null, 'uploads/vehicles/') //users/profile/8989.png
    },
    filename: function (req, file, cb) {
        //cb(null, `${Date.now()}-${file.originalname}`) este sería por fechas, repite imagenes
        cb(null, `ultimo.jpg`) // si dos imagenes se llaman igual, se sobreescriben
    }
})
 let upload = multer({ storage: storage });


export default {
    storage,
    upload
}