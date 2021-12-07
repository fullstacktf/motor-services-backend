import express from 'express';
import session from 'express-session';
import {router as loginRouter} from './routes/login.js';
import {router as userRouter} from './routes/user.js';
import {router as vehicleRouter} from './routes/vehicle.js';
import {router as appointmentRouter} from './routes/appointments.js';
import {router as serviceRouter} from './routes/services.js';
import {router as reviewRouter} from './routes/reviews.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';


dotenv.config({path: './.env'});

const app = express();
const port = 3000;


app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 86400000, // 30 * (24 * 60 * 60 * 1000) = 30 * 86400000 => session is stored 30 days
}
}));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/', loginRouter);
app.use('/vehicles', vehicleRouter);
app.use('/users', userRouter);
app.use('/appointments', appointmentRouter);
app.use('/services', serviceRouter);
app.use('/reviews', reviewRouter);



app.listen(port, async() => console.log(`Listening on port ${port}`));

export {app};

