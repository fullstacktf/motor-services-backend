import { UserRepository } from '../repositories/user.repository.js';

const userRepository = new UserRepository();

export const findUser =  (user_id) => {
   return userRepository.findByUserPk(user_id);
}

export const updateUser = (variables) =>{
    return userRepository.update(variables);
}

export const destroyUser = (dni) => {
    return userRepository.destroy(dni);
}

export const updatePicker = (variables) => {
    return userRepository.updatePicker(variables);
}
