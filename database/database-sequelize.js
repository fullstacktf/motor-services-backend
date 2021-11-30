import pkg from 'sequelize';
const {Sequelize} = pkg;

export const sequelize = new Sequelize('pickauto','newuser','test',{
    host:'127.0.0.1',
    dialect:'mariadb',
    port:'3307',
    define: {
        timestamps: false
    }
})
