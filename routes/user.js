import express from 'express';
export const router = express.Router();
import userController from '../controllers/user.controller.js';
import uploadUtils from '../uploadUtils/uploadImageUser.js';

router.get('/:userID', (req, res, next) => {
        return userController.getUser(req, res);
})

router.put('/:userID',(req, res) => {
    return userController.editUser(req, res);
})

router.delete('/:userID',(req, res) => {
    return userController.deleteUser(req, res);
})

router.update('/picker/:pickerID', (req,res) => {
    return userController.editPicker(req, res);
})

router.post('/uploadImage/:userID', uploadUtils.upload.single('dataFile'), (req, res, next) => {
    return userController.uploadImage(req, res, next);
});
