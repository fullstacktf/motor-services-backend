import express  from  'express'
export const router = express.Router()
import {ReviewModel} from '../models/review.model.js'


const review = new ReviewModel();

router.get('/:userID/appointments/:appointmentID/review', async (req, res) => { 
    return review.getReviewByID(req,res)
  }); //get a review of a past appointment, if it has it.

router.get('/:userID/reviews', async (req, res) => { 
    return review.getReviews(req,res)
});//get all reviews form an specific user, if it has it.
router.post('/:userID/appointments/:appointmentID/review', async (req,res) => {
    return review.addReview(req, res)
  }); //post a review to an specific appointment.
router.delete('/:userID/appointments/:appointmentID/review', async (req,res) => {
    return review.deleteReview(req, res)
  }); //remove a review of a specific appointment, if it has it.