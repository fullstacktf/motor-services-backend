import express from 'express';
const router = express.Router();
import { LoginModel } from '../models/login.model.js'

const login = new LoginModel();

router.post('/auth', async(req, res) => {
    return login.logIn(req, res);
});

router.get('/logout', async(req, res)=> {
    return login.logOut(req, res);
});

router.get('/checking', async(req,res) => {
    return login.checkCookie(req,res);
})

router.get('/test', (req,res) => {
    return login.isAuthenticated(req, res);
})

export {router};