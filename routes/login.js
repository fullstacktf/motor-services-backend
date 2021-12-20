import express from 'express';
import { async } from 'regenerator-runtime';
const router = express.Router();
import loginController from '../controllers/login.controller.js';

router.post('/auth', async(req, res) => {
    return loginController.login(req, res);
});

router.get('/logout', async(req, res)=> {
    return loginController.logout(req, res);
});

router.post('/register' , async(req, res) => {
    return loginController.addUser(req, res);
})

router.get('/cookie', async(req, res) => {
    return req.cookies.jwt
})

// router.get('/checking', async(req,res) => {
//     return login.checkCookie(req,res);
// })

// router.get('/test', (req,res) => {
//     return login.isAuthenticated(req, res);
// })

export {router};