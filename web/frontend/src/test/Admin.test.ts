import { expect, test } from "vitest";
import Admin from "src/entities/User";
import AdminGateway from "src/gateway/UserGateway";


test('Deve testar a alteracao de dados de um Admin', async () => {
   const admin = new AdminGateway()
   const data = {
      _id:"653ee45e15ca592fe63c7b8b",
      cpf:"70116562277",
      username:"Henrique feia",
      surname:"Gabriel",
      idEnterprise:"652c8b115bcca7630eab1041",
      phone:"+5569984696665",
      email:"henrique@gmail.com",
      dateBirth:"2005-08-23T00:00:00.000Z",
      type:"admin",
      plan:"plan",
   }
   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTNlZTQ1ZTE1Y2E1OTJmZTYzYzdiOGIiLCJwZXJtaXNzaW9uIjoidXNlciIsImlhdCI6MTY5OTAyOTAyOSwiZXhwIjoxNjk5MTE1NDI5fQ.6Hg9C553s9mu14hQXj_FnyTA1u4P3n3N0Lz-X3yF420'

   let alterStatus = await admin.alterData(data, token)
   console.log(alterStatus)
})