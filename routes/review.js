import express  from  'express';
export const router = express.Router();
import reviewController from '../controllers/review.controller.js';


router.get('/owner/:userID', async (req, res) => { 
    return reviewController.getReviewsByUserID(req,res);
});

router.get('/picker/:id_picker', async (req,res)=>{
    return reviewController.getReviewsByPickerID(req,res);
});

router.get('/averageRatingPicker/:id_picker', async (req,res)=>{
  return reviewController.getAverageRatingByPickerID(req,res);
});

router.get('/:userID/appointment/:id_appointment/', async (req,res)=>{
  return reviewController.getReviewByAppointmentID(req,res);
});

router.post('/:userID/appointment/:id_appointment/', async (req,res) => {
    return reviewController.addReview(req, res);
  }); 

router.delete('/:userID/appointment/:id_appointment', async (req,res) => {
    return reviewController.deleteReview(req, res);
  }); 
