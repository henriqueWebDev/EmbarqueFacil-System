import axios from "axios"
import backendDefaultRoute from "src/entities/BackendDefaultRoute"

export default class ClientsHttp {
   constructor() {}

   async getClient(id, token) {
      try {
         const response = await axios.get(backendDefaultRoute + 'user/' + id, {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': token
            }
         })
         return response.data
      } catch (error) {
         throw error
      }
   }

   async getAllClient(token) {
      try {
         const response = await axios.get(backendDefaultRoute + 'user',{
            headers: {
               'Content-Type': 'application/json',
               'Authorization': token
            }
         })
         return response.data
      } catch (error) {
         throw error
      }
   }
}