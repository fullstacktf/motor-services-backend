import {ReviewRepository} from '../repositories/review.repository.js';

const reviewRepository = new ReviewRepository();

export const findReviewsByUserID = (user_id) => {
    return reviewRepository.findByUserPk(user_id);
}

export const findReviewsByAppointmentID = (appointment_id) => {
    return reviewRepository.findByAppointmentPk(appointment_id);
}

export const findReviewsByPickerID = (picker_id) => {
    return reviewRepository.findByPickerPk(picker_id);
}

export const findAverageRatingByPickerID = (picker_id) => {
    return reviewRepository.findAverageRatingByPickerPk(picker_id);
}

export const createReview = (id_appointment) => {
    return reviewRepository.create(id_appointment);
}

export const updateReview = (variables) => {
    return reviewRepository.update(variables);
}

export const destroyReview = (appointment_id) => {
    return reviewRepository.destroy(appointment_id);
}