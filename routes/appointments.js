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

router.get('/', async (req, res) => { // Cambiar ruta
    return appointment.getAvailablePickers(req, res);
});

router.get('/filter', async (req, res) => {
    return appointment.getAllAppointmentsByDate(req, res);
})

router.get('/:vehicleID', async (req, res) => {
    return appointment.getAppointment(req, res);
});

router.get('/:vehicleID/:appointment_date', async (req, res) => {
    return appointment.getSpecificAppointment(req,res);
})

router.put('/:vehicleID/:appointment_date', async (req, res) => {
    return appointment.editAppointment(req, res);
});

router.delete('/:vehicleID/:appointment_date', async (req, res) => {
    return appointment.removeAppointment(req, res);
});

router.get('/:vehicle/filter', async (req, res) => {
    return appointment.getVehicleAppointmentsByDate(req, res);
})

export { router }