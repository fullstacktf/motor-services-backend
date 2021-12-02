import pkg from 'sequelize';
const {Sequelize} = pkg;

const sequelize = new Sequelize('pickauto','newuser','test',{
    host:'127.0.0.1',
    dialect:'mariadb',
    port:'3307',
    define: {
        timestamps: false
    }
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


  export {sequelize}