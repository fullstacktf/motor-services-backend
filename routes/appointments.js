import express from 'express';
import appointmentController from '../controllers/appointment.controller.js';
const router = express.Router();



router.get('/owner/:userID',(req, res) => {
    return appointmentController.getOwnerAppointments(req, res); //hacer el join
})

router.get('/picker/:pickerID', async (req, res) => {
    return appointmentController.getPickerAppointments(req, res); // hacer el join
});

router.get('/availablePickers', async(req, res) => {
    return appointmentController.getAvailablePickers(req, res); 
});

router.get('/vehicle/:vehicleID', async (req, res) => {
    return appointmentController.getAppointmentByVehicleID(req, res);
});

router.get('/:appointmentID', async (req, res) => {
    return appointmentController.getAppointmentByID(req,res);
});

router.post('/vehicle/:vehicleID', async (req, res) => { 
    return appointmentController.addAppointment(req, res);
});

router.put('/:appointmentID', async (req, res) => {
    return appointmentController.editAppointment(req, res);
});

router.delete('/:appointmentID', async (req, res) => {
    return appointmentController.deleteAppointment(req, res);
});


export { router }