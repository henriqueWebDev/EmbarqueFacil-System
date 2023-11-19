import ClientsHttp from "src/http/ClientsHttp";

export default class ClientsGateway {
   constructor() {}

   async client(id, token) {
      const clientsHttp = new ClientsHttp()
      try  {
         const client = await clientsHttp.getClient(id, token)
         return client
      } catch (error) {
         return error.message;
      }
   }

   async allClients(token) {
      const clientsHttp = new ClientsHttp()
      try  {
         const users = await clientsHttp.getAllClient(token)
         let clients = []
         users.forEach(element => {
            if (element.type == 'client') {
               const elementData = {
                  username: element.username, 
                  surname: element.surname, 
                  _id: element._id
               }
               clients.push(elementData)
            }
         });
         return clients
      } catch (error) {
         return error.message;
      }
   }
}