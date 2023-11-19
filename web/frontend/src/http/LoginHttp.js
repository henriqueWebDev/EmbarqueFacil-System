import axios from "axios"
import backendDefaultRoute from "src/entities/BackendDefaultRoute"

export default class LoginHttp{
   constructor() {}

   async post(userData) {
      try {
         const response = await axios.post(backendDefaultRoute + 'user/login', userData, {
            headers: {
               'Content-Type': 'application/json'
             }
         })
         let user = {
            data: response.data.user,
            token: response.data.token
         }
         return user
      } catch (error) {
         throw error;
      }
   }
}