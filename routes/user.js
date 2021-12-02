import express from 'express';
export const router = express.Router();
// import { UserModel } from '../models/user.model.js'

import {UserController} from '../controller/user.controller.js'
import {AppointmentController} from '../controller/appointment.controller.js'
const user = new UserController();
const appointment = new AppointmentController();
// const user = new UserModel();
//login y logout


router.get('/:userID/appointments',(req, res) => {
    return appointment.getOwnerAppointments(req, res)
})

router.get('/:pickerID/pickers/appointments', async (req, res) => {
    return appointment.getPickerAppointments(req, res);
});

router.get('/:userID', (req, res) => {
    return user.getUser(req, res)
})

router.post('/' ,(req, res) => {
    return user.addUser(req, res)
})

router.put('/:userID',(req, res) => {
    return user.updateUser(req, res)
})

router.delete('/:userID',(req, res) => {
    return user.deleteUser(req, res)
})



// router.post('/', async (req, res) => {
//     return user.addUser(req, res);
// });

// router.get('/', async (req, res) => {
//     return user.getUsers(req, res);
// });

// router.get('/rols', async (req, res) => {
//     return user.getRoles(req, res);
// });

// router.get('/:userID', async (req, res) => {
//     return user.getUser(req, res);
// });

// router.delete('/', async (req, res) => {
//     return user.deleteUser(req, res);
// });


// router.put('/:id', async (req, res) => {
//     return user.editUser(req, res);
// });

// router.get('/all/pickers', async (req, res) => {
//     return user.getPickers(req, res);
// });


// router.get('/all/owners', async (req, res) => {
//     return user.getOwners(req, res);
// });

// router.get('/owner/:userID/appointments', async (req, res) => {
//     return user.getOwnerAppointments(req, res);
// });

// router.get('/picker/:pickerID/appointments', async (req, res) => {
//     return user.getPickerAppointments(req, res);
// });
