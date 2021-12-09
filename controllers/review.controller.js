import { findReviewsByUserID,
     findReviewsByAppointmentID, 
     findReviewsByPickerID, 
     findAverageRatingByPickerID,
     createReview, 
     destroyReview 
    } from '../services/review.service.js';



    const getReviewsByUserID = async (req, res) => {
        const user_id = req.params.userID;
        findReviewsByUserID(user_id)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(String(err)));
    }

    const getReviewByAppointmentID = async (req, res) => {
        const appointment_id = req.params.id_appointment;
        findReviewsByAppointmentID(appointment_id)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(String(err)));
    }

    const getReviewsByPickerID = async (req, res) => {
        const picker_id = req.params.id_picker;
        findReviewsByPickerID(picker_id)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(String(err)));
    }

    const getAverageRatingByPickerID = async(req, res) => {
        const picker_id = req.params.id_picker;
        findAverageRatingByPickerID(picker_id)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(String(err)));
    }

    const addReview = async (req, res) => {
        const variables = {
            id_appointment: req.params.id_appointment,
            notes: req.body.rating_notes,
            rating: req.body.rating,
        }
        createReview(variables)
            .then(() => res.status(200).send("Valoración añadida correctamente"))
            .catch(err => res.status(500).json(String(err)));
    }

    const deleteReview = async (req, res) => {
        const id_appointment = req.params.id_appointment;
        destroyReview(id_appointment)
            .then(() => res.status(200).send("Valoración eliminada correctamente"))
            .catch(res.status(500).json(String(err)));

    }

export default {
    getReviewsByUserID,
    getReviewByAppointmentID,
    getReviewsByPickerID,
    getAverageRatingByPickerID,
    addReview,
    deleteReview
};