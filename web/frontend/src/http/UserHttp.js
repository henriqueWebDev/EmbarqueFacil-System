import axios from "axios"
import backendDefaultRoute from "src/entities/BackendDefaultRoute"

export default class AdminHttp {
   constructor() {}

   async put(data, token) {
      try {
         const response = await axios.put(backendDefaultRoute + 'user/' + data._id, data, {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': token
           }
         })
         return true
      } catch (error) {
         throw error
      }
   }
}