import axios from "axios";
import backendDefaultRoute from "src/entities/BackendDefaultRoute";

export default class RegisterEnterpriseHttp {
   constructor () {}

   async post(data) {
      try {
         const response = await axios.get(backendDefaultRoute + 'enterprise', {
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