import express  from  'express'
export const router = express.Router()
import reviewController from '../controllers/review.controller.js'


router.get('/user/:userID', async (req, res) => { 
    return reviewController.getReviewsByUserID(req,res)
});

router.get('/picker/:id_picker', async (req,res)=>{
    return reviewController.getReviewByPickerID(req,res)
});

router.get('/appointment/:id_appointment/', async (req,res)=>{
  return reviewController.getReviewByAppointmentID(req,res)
});

router.post('/appointment/:id_appointment/', async (req,res) => {
    return reviewController.addReview(req, res)
  }); 

router.delete('/appointment/:id_appointment', async (req,res) => {
    return reviewController.deleteReview(req, res)
  }); 