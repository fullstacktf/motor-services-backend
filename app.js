import express from 'express';
import {router as userRouter} from './routes/user.js';
import { router as vehicleRouter } from './routes/vehicle.js';
import {router as appointmentRouter} from './routes/appointments.js';
import {router as serviceRouter} from './routes/services.js';
import {router as reviewRouter} from './routes/reviews.js';


const app = express();
const port = 3000;


app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/vehicles', vehicleRouter);
app.use('/users', userRouter);
app.use('/appointments', appointmentRouter);
app.use('/services', serviceRouter);
app.use('/reviews', reviewRouter);



app.listen(port, () => console.log(`Listening on port ${port}`));

