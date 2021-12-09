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

export const createReview = (variables) => {
    return reviewRepository.create(variables);
}

export const destroyReview = (appointment_id) => {
    return reviewRepository.destroy(appointment_id);
}