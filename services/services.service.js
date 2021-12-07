import { ServicesRepository } from '../repositories/services.repository.js';

const servicesRepository = new ServicesRepository();


export const findServices = () => {
    return servicesRepository.findAll();
}

export const findService = (service_id) => {
    return servicesRepository.findByPk(service_id);
}

