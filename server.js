import {app} from './app.js'
const port = 3001;


app.get('/', (req, res) => {
    res.send('Bienvenidos a la API de pickauto');
  });
app.listen(port, () => console.log(`Listening on port ${port}`));

