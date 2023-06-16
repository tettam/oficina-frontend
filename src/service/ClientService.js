import axios from "axios";


export class ClientService {
  
  url = `https://oficina-backend-production.up.railway.app/clients`;

  findAll(){
    return axios.get(`${this.url}`);
  }

  findById(id) {
    return axios.get(`${this.url}/${id}`);
  }

  insert(object) {
    return axios.post(`${this.url}` , object);
  }

  update(object) {
    return axios.put(`${this.url}`, object);
  }

  delete(id) {
    return axios.delete(`${this.url}/${id}`);
  }
}
