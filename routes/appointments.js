import express from 'express';
import appointmentController from '../controllers/appointment.controller.js';
const router = express.Router();



router.get('/user/:userID',(req, res) => {
    return appointmentController.getOwnerAppointments(req, res);
})

router.get('/picker/:pickerID', async (req, res) => {
    return appointmentController.getPickerAppointments(req, res);
});


router.post('/vehicle/:vehicleID', async (req, res) => { 
    return appointmentController.addAppointment(req, res);
});

router.get('/availablePickers', async(req, res) => {
    return appointment.getAvailablePickers(req, res);
})

router.get('/vehicle/:vehicleID', async (req, res) => {
    return appointment.getAppointmentByVehicleID(req, res);
});

router.get('/:appointmentID', async (req, res) => {
    return appointment.getAppointmentByID(req,res);
})

router.put('/:appointmentID', async (req, res) => {
    return appointment.editAppointment(req, res);
});

router.delete('/:appointmentID', async (req, res) => {
    return appointment.removeAppointment(req, res);
});


export { router }