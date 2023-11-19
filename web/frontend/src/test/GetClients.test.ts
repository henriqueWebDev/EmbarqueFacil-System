import ClientsGateway from "src/gateway/ClientsGateway";
import { expect, test } from "vitest";

test('Deve encontrar um cliente', async () => {
   const clients = new ClientsGateway()
   console.log(await clients.client('652fcdcc4682e998a0da6a2c', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTNlZTQ1ZTE1Y2E1OTJmZTYzYzdiOGIiLCJwZXJtaXNzaW9uIjoidXNlciIsImlhdCI6MTY5OTczMTk0NCwiZXhwIjoxNjk5ODE4MzQ0fQ.5x1OedgwmD9OF5WNAQexFe_uDgEhDYp2KHnfDIlLWUA'))
})

test('Deve encontrar todos os clientes', async () => {
   const clients = new ClientsGateway()
   console.log(await clients.allClients('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTNlZTQ1ZTE1Y2E1OTJmZTYzYzdiOGIiLCJwZXJtaXNzaW9uIjoidXNlciIsImlhdCI6MTY5OTczMTk0NCwiZXhwIjoxNjk5ODE4MzQ0fQ.5x1OedgwmD9OF5WNAQexFe_uDgEhDYp2KHnfDIlLWUA'))
})

test('deve pegar a quantidade de clientes')