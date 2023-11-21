   import RegisterEnterpriseGateway from "src/gateway/RegisterEnterpriseGateway"

   export default class RegisterEnterprise {
      constructor() {
         this.registerEnterprise = new RegisterEnterpriseGateway()
      }

      async register(dataEnterprise, dataAdmin) {
         const response = await this.registerEnterprise.create(dataEnterprise, dataAdmin)
         return response
      }
   }