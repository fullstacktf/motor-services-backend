import multer from 'multer';

// SET STORAGE
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

let upload = multer({ storage: storage })

upload = upload.single('myFile')

const uploadFile = (req, res) => {
    res.send({ data: 'Enviar un archivo' })
}


export default {
    upload,
    uploadFile
}