import RegisterEnterpriseHttp from "src/http/RegisterEnterpriseHttp";

export default class RegisterEnterpriseGateway {
   constructor() {}

   async create(dataEnterprise, dataAdmin) {
      const registerEnterpriseHttp = new RegisterEnterpriseHttp()
      try {
         const response = registerEnterpriseHttp.post(dataEnterprise, dataAdmin)
         return true
      } catch (error) {
         return error.message;
      }
   }
}