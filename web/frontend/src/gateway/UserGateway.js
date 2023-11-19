import AdminHttp from "src/http/UserHttp"

export default class AdminGateway {
   constructor() {}

   async alterData(data, token) {
      const adminHttp = new AdminHttp()
      try {
         const admin = await adminHttp.put(data, token)
         return 'successfully changed'
      } catch (error) {
         return error.message;
      }
   }
}