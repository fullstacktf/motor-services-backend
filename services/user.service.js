import { User } from '../models/user.model.js';


export const findUser =  (user_id) => {
   return User.findByPk(user_id);
}

export const createUser = (variables) => {
    return User.create(variables);
}

export const updateUser = (variables, dni) =>{
    return User.update(variables,{
        where:{
            DNI: dni
        }
    })
}

export const destroyUser = (dni) => {
    return User.destroy({
        where: {
            DNI: dni
        }
    })
}