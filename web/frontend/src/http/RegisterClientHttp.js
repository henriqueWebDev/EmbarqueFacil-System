import axios from "axios";
import backendDefaultRoute from "src/entities/BackendDefaultRoute";

export default class RegisterClientHttp {
   constructor () {}

   async post(data) {
      try {
         const response = await axios.post(backendDefaultRoute + 'user', data, {
            headers: {
               'Content-Type': 'application/json',
            }
         })
         return response
      } catch (error) {
         throw error;
      }
   }
}