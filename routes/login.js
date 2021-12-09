import express from 'express';
const router = express.Router();
import loginController from '../controllers/login.controller.js';

router.post('/auth', async(req, res) => {
    return loginController.login(req, res);
});

router.get('/logout', async(req, res)=> {
    return loginController.logout(req, res);
});

// router.get('/checking', async(req,res) => {
//     return login.checkCookie(req,res);
// })

// router.get('/test', (req,res) => {
//     return login.isAuthenticated(req, res);
// })

export {router};