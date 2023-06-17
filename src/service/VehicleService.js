import axios from "axios"

export class VehicleService {

  url = `${import.meta.env.VITE_APP_API}/vehicles`;

  findAll(){
    return axios.get(`${this.url}`);
  }

  findById(id) {
    return axios.get(`${this.url}/${id}`);
  }

  insert(object) {
    return axios.post(`${this.url}`, object);
  }

  update(object) {
    return axios.put(`${this.url}`, object);
  }

  delete(id) {
    return axios.delete(`${this.url}/${id}`);
  }
}