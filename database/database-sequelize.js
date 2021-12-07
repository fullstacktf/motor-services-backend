import pkg from 'sequelize';
/*import dotenv from 'dotenv';
dotenv.config();
import customenv from 'custom-env';
customenv.config('dev');
customenv.config('prod');*/
const {Sequelize} = pkg;

const sequelize = new Sequelize('pickauto','newuser','test',{
    host:'127.0.0.1',
    dialect:'mariadb',
    port:'3307',
    define: {
        timestamps: false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    JSON.stringify(err);
  });


  export {sequelize}