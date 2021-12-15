import { UserRepository } from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const userRepository = new UserRepository();

export const findUser =  (user_id) => {
   return userRepository.findByUserPk(user_id);
}

export const createUser = (variables) => {
    const plainPassword = variables.password_key;
    variables.password_key = bcrypt.hashSync(plainPassword, salt);
    return userRepository.create(variables);
}

export const updateUser = (variables) =>{
    return userRepository.update(variables);
}

export const destroyUser = (dni) => {
    return userRepository.destroy(dni);
}