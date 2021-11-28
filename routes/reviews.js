import express  from  'express'
export const router = express.Router()
import {ReviewModel} from '../models/review.model.js'


const review = new ReviewModel();

router.get('/:userID/:vehicleID/:appointmentdate', async (req, res) => { 
    return review.getReviewByID(req,res)
  }); //get a review of a past appointment, if it has it.

router.get('/:userID', async (req, res) => { 
    return review.getReviews(req,res)
});//get all reviews from an specific user, if it has it.

router.get('/picker/:pickerID', async (req,res)=>{
    return review.getReviewByPicker(req,res)
});//get all reviews from an specific picker

router.post('/:userID/:vehicleID/:appointmentdate', async (req,res) => {
    return review.addReview(req, res)
  }); //post a review to an specific appointment.

router.delete('/:userID/:vehicleID/:appointmentdate', async (req,res) => {
    return review.deleteReview(req, res)
  }); //remove a review of a specific appointment, if it has it.