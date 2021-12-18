import express from 'express';
export const router = express.Router();
import userController from '../controllers/user.controller.js';

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

router.post('/upload/:userID', (req, res) => {
    return userController.uploadImage(req, res);
})

// router.get('/:userID', (req, res) => {
//     LoginModel.isAuthenticated(req, res, next, "user.getUser(req,res)")
// });

// router.post('/:id/auth', async (req, res) => {
//     return user.logIn(req,res);
// });

// router.get('/logout', async (req,res) => {
//     return user.logOut(req,res);
// });

//comprobar si es picker o owner?