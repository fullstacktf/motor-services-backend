import { findReviewsByUserID,
     findReviewsByAppointmentID, 
     findReviewsByPicker, 
     createReview, 
     destroyReview 
    } from '../services/review.service.js';



    const getReviewsByUserID = async (req, res) => {
        const user_id = req.params.id_user;
        findReviewsByUserID(user_id)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(err));
    }

    const getReviewByAppointmentID = async (req, res) => {
        const appointment_id = req.params.id_appointment;
        findReviewsByAppointmentID(appointment_id)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(err));
    }


    const getReviewsByPicker = async (req, res) => {
        const picker_id = req.params.id_picker;
        findReviewsByPicker(picker_id)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(err));
    }

    const addReview = async (req, res) => {
        const variables = {
            appointment_date: req.params.appointmentdate,
            vehicleID: req.params.vehicleID,
            rating_notes: req.body.rating_notes,
            rating: req.body.rating,
        }
        createReview(variables)
            .then(() => res.status(200).send("Valoración añadida correctamente"))
            .catch(res.status(500).json(err));
    }

    const deleteReview = async (req, res) => {
        const id_appointment = req.params.id_appointment;
        destroyReview(id_appointment)
            .then(() => res.status(200).send("Valoración eliminada correctamente"))
            .catch(res.status(500).json(err));

    }

export default {
    getReviewsByUserID,
    getReviewByAppointmentID,
    getReviewsByPicker,
    addReview,
    deleteReview
};