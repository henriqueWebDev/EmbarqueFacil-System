import axios from "axios";
import backendDefaultRoute from "src/entities/BackendDefaultRoute";

export default class RegisterEnterpriseHttp {
   constructor () {}

   async post(dataEnterprise, dataAdmin) {
      try {
         const response = await axios.post(backendDefaultRoute + 'enterprise', dataEnterprise, dataAdmin, {
            headers: {
                'Content-Type': 'application/json',
                }
            })
         return true
      } catch (error) {
         throw error;
      }
   }
}