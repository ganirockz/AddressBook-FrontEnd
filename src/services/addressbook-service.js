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
    getPerson(id){
        return AxiosService.getService(`${this.baseUrl}get/${id}`);
    }
    updatePerson(data,id){
        return AxiosService.putService(`${this.baseUrl}update/${id}`,data);
    }
    deletePerson(id){
        return AxiosService.deleteService(`${this.baseUrl}delete/${id}`);
    }
}