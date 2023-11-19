import ClientsGateway from "src/gateway/ClientsGateway"

export default class ClientsList {
   constructor() {
      this.token = localStorage.getItem('token')
      this.clientsGateway = new ClientsGateway()
   }

   async getAllClients() {
      return await this.clientsGateway.allClients(this.token)
   }

   async numberOfClients() {
      const numberOfClients = await this.clientsGateway.allClients(this.token)
      return numberOfClients.length
   }

   async getClient(id) {
      return await this.clientsGateway.client(id, this.token)
   }
}