import config from '../config/config'
import AxiosService from './axios-service'

export default class AddressbookService{
    baseUrl = config.baseUrl;
    addPerson(data){
        return AxiosService.postService(`${this.baseUrl}create`,data);
    }
    getAllPersons(){
        return AxiosService.getService(`${this.baseUrl}get`);
    }
    getPerson(firstName){
        return AxiosService.getService(`${this.baseUrl}get/${firstName}`);
    }
    updateEmployee(data,firstName){
        return AxiosService.putService(`${this.baseUrl}update/${firstName}`,data);
    }
    deleteEmployee(firstName){
        return AxiosService.deleteService(`${this.baseUrl}delete/${firstName}`);
    }
}