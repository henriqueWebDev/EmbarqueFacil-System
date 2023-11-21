import RegisterEnterpriseHttp from "src/http/RegisterEnterpriseHttp";

export default class RegisterEnterpriseGateway {
   constructor() {}

   async create(dataEnterprise, dataAdmin) {
      const registerEnterpriseHttp = new RegisterEnterpriseHttp()
      let data = {dataEnterprise, dataAdmin}
      try {
         const response = await registerEnterpriseHttp.post(data)
         console.log('response: ', response)
         //if (response) {
         //   return 'successfully registered'
         //}
      } catch (error) {
         return error.message;
      }
   }
}