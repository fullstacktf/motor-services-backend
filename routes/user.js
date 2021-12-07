import express from 'express';
export const router = express.Router();

import userController from '../controllers/user.controller.js';

router.get('/:userID', (req, res) => {
    return userController.getUser(req, res);
})

router.post('/' ,(req, res) => {
    return userController.addUser(req, res);
})

router.put('/:userID',(req, res) => {
    return userController.editUser(req, res);
})

router.delete('/:userID',(req, res) => {
    return userController.deleteUser(req, res);
})


