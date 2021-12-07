import express from 'express';
const router = express.Router();
import { UserModel } from '../models/user.model.js';
import { LoginModel } from '../models/login.model.js';
import jwt from 'jsonwebtoken';

const user = new UserModel();
//login y logout

router.post('/', async (req, res) => {
    return user.addUser(req, res);
});

router.get('/', async (req, res) => {
    return user.getUsers(req, res);
});

router.get('/rols', async (req, res) => {
    return user.getRoles(req, res);
});

router.get('/:userID', (req, res) => {
    LoginModel.isAuthenticated(req, res, next, "user.getUser(req,res)")
});

router.delete('/', async (req, res) => {
    return user.deleteUser(req, res);
});


router.put('/:id', async (req, res) => {
    return user.editUser(req, res);
});

router.get('/all/pickers', async (req, res) => {
    return user.getPickers(req, res);
});


router.get('/all/owners', async (req, res) => {
    return user.getOwners(req, res);
});

router.get('/owner/:userID/appointments', async (req, res) => {
    return user.getOwnerAppointments(req, res);
});

router.get('/picker/:pickerID/appointments', async (req, res) => {
    return user.getPickerAppointments(req, res);
});

router.post('/:id/auth', async (req, res) => {
    return user.logIn(req,res);
});

router.get('/logout', async (req,res) => {
    return user.logOut(req,res);
});


export { router };