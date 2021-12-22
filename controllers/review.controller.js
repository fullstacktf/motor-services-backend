import { findReviewsByUserID,
     findReviewsByAppointmentID, 
     findReviewsByPickerID, 
     findAverageRatingByPickerID,
     createReview, 
     destroyReview , 
     updateReview
    } from '../services/review.service.js';



    const getReviewsByUserID = async (req, res) => {
        const user_id = req.params.userID;
        //if (user_id==req.userDNI){
            findReviewsByUserID(user_id)
                .then(data => res.status(200).json(data))
                .catch(err => res.status(500).json(String(err)));
        //} else {res.status(403).json({error: "No tiene permisos"})}
    }

    const getReviewByAppointmentID = async (req, res) => {
        const user_id = req.params.userID;
        const appointment_id = req.params.id_appointment;
        //if (user_id==req.userDNI){
            findReviewsByAppointmentID(appointment_id)
                .then(data => res.status(200).json(data))
                .catch(err => res.status(500).json(String(err)));
        //}else {res.status(403).json({error: "No tiene permisos"})}
    }

    const getReviewsByPickerID = async (req, res) => {
        const picker_id = req.params.id_picker;
        //if (picker_id==req.userDNI){
            findReviewsByPickerID(picker_id)
                .then(data => res.status(200).json(data))
                .catch(err => res.status(500).json(String(err)));
        //}else {res.status(403).json({error: "No tiene permisos"})}
    }

    const getAverageRatingByPickerID = async(req, res) => {
        const picker_id = req.params.id_picker;
        //if (picker_id==req.userDNI){
            findAverageRatingByPickerID(picker_id)
                .then(data => res.status(200).json(data))
                .catch(err => res.status(500).json(String(err)));
        //}else {res.status(403).json({error: "No tiene permisos"})}
    }

    const addReview = async (req, res) => {
        const user_id=req.params.userID;
        const id_appointment= req.params.id_appointment;

        //if (user_id==req.userDNI){
            createReview(id_appointment)
                .then(() => res.status(200).send("Valoración añadida correctamente"))
                .catch(err => res.status(500).json(String(err)));
        //}else {res.status(403).json({error: "No tiene permisos"})}
    }

    const editReview = async (req, res) => {
        const user_id=req.params.userID;
        const variables = {
            review_id: req.params.id_appointment,
            ...req.body
        }

        //if (user_id==req.userDNI){
            updateReview(variables)
                .then(() => res.status(200).send("Valoración actualizada correctamente"))
                .catch(err => res.status(500).json(String(err)));
        //}else {res.status(403).json({error: "No tiene permisos"})}
    }

    const deleteReview = async (req, res) => {
        const user_id = req.params.userID;
        const id_appointment = req.params.id_appointment;
        //if (user_id==req.userDNI){
            destroyReview(id_appointment)
                .then(() => res.status(200).send("Valoración eliminada correctamente"))
                .catch(res.status(500).json(String(err)));
        //}else {res.status(403).json({error: "No tiene permisos"})}

    }

export default {
    getReviewsByUserID,
    getReviewByAppointmentID,
    getReviewsByPickerID,
    getAverageRatingByPickerID,
    addReview,
    deleteReview,
    editReview
};