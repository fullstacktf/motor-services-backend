import express from 'express';
import {router as userRouter} from './routes/users.js';
import {router as appointmentRouter} from './routes/appointments.js';
import {router as serviceRouter} from './routes/services.js';


const app = express();
const port = 3000;


app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.use('/users', userRouter);
app.use('/appointments', appointmentRouter);
app.use('/services', serviceRouter);


app.listen(port, () => console.log(`Listening on port ${port}`));

