import express from 'express';
const router = express.Router();
import uploadController from '../controllers/upload.controller.js';
import multer from 'multer';


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
 let upload = multer({ storage: storage });
 // handle single file upload
 router.post('/', upload.single('dataFile'), (req, res, next) => {
    const file = req.file;
    console.log(file);
    if (!file) {
       return res.status(400).send({ message: 'Please upload a file.' });
    }
    return res.send({ message: 'File uploaded successfully.', file });
 });



export {router}




