import RegisterClientHttp from "src/http/RegisterEnterpriseHttp";

export default class RegisterClientGateway {
   constructor() {}

   async create(data) {
      const registerClient = new RegisterClientHttp()
      try {
         const response = await registerClient.post(data)
         if (response) {
            return 'successfully registered'
         }
      } catch (error) {
         return error.message;
      }
   }
}