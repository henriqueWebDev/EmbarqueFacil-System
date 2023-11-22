import RegisterClientGateway from "src/gateway/RegisterEnterpriseGateway"

export default class RegisterClient {
   constructor() {
      this.registerClient = new RegisterClientGateway()
   }

   async register(data) {
      const response = await this.registerClient.create(data)
      return response
   }
}