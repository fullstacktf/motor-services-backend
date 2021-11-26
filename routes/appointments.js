import express from 'express';
import { AppointmentModel } from '../models/appointment.model.js';
const router = express.Router();



const appointment = new AppointmentModel();

router.get('/', async (req, res) => {
    return appointment.getAppointments(req, res);
});

router.post('/', async (req, res) => {
    return appointment.addAppointment(req, res);
});

router.get('/:appointmentID', async (req, res) => {
    return appointment.getAppointment(req, res);
});

router.put('/:appointmentID', async (req, res) => {
    return appointment.editAppointment(req, res);
});

router.delete('/:appointmentID', async (req, res) => {
    return appointment.removeAppointment(req, res);
});

export { router }