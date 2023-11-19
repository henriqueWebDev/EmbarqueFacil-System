import AdminGateway from "src/gateway/UserGateway";

export default class Admin {
   constructor () {
      this.adminGateway = new AdminGateway()
   }

   async alterData(data, token) {
      const alterStatus = await this.adminGateway.alterData(data, token)
      if (alterStatus == 'successfully changed') {
         localStorage.setItem('user', JSON.stringify(data)) 
         return 'Success In Changing'
      } 
      if (!(alterStatus == 'successfully changed')) {
         return 'Error When Changing'
      }
   }
}