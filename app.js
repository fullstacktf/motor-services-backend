import express from 'express';
import {router as loginRouter} from './routes/login.js';
import {router as userRouter} from './routes/user.js';
import {router as vehicleRouter} from './routes/vehicle.js';
import {router as appointmentRouter} from './routes/appointments.js';
import {router as serviceRouter} from './routes/services.js';
import {router as reviewRouter} from './routes/review.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({path: './.env'});

const app = express();

app.use(cors());

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(cookieParser());

app.use('/', loginRouter);
app.use('/vehicles', vehicleRouter);
app.use('/users', userRouter);
app.use('/appointments', appointmentRouter);
app.use('/services', serviceRouter);
app.use('/reviews', reviewRouter);



export {app};