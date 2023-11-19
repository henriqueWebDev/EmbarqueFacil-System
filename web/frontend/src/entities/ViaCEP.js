import ViaCepGateway from "src/gateway/ViaCepGateway";

export default class ViaCepApi {
   constructor () {}
  
   async getAdress(cep) {
      const viaCep = new ViaCepGateway()
      return await viaCep.getAdress(cep)
   }
}