import express  from  'express'
export const router = express.Router()
import reviewController from '../controllers/review.controller.js'


router.get('/user/:userID', async (req, res) => { 
    return reviewController.getReviewsByUserID(req,res)
});//get all reviews from an specific user, if it has it.

router.get('/picker/:id_picker', async (req,res)=>{
    return reviewController.getReviewByPickerID(req,res)
});//get all reviews from an specific picker

router.get('/appointment/:id_appointment/', async (req,res)=>{
  return reviewController.getReviewByAppointmentID(req,res)
});//get all reviews from an specific picker

router.post('/appointment/:id_appointment/', async (req,res) => {
    return reviewController.addReview(req, res)
  }); //post a review to an specific appointment.

router.delete('/appointment/:id_appointment', async (req,res) => {
    return reviewController.deleteReview(req, res)
  }); //remove a review of a specific appointment, if it has it.