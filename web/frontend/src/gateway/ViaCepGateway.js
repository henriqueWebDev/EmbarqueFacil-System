import ViaCepHttp from "src/http/ViaCepHttp";

export default class ViaCepGateway {
   constructor () {}
   
   async getAdress(cep) {
      const viaCep = new ViaCepHttp()
      const cepClean = cep.replace(/\D/g, '')
      try {
         return await viaCep.get(cepClean)
      } catch (error) {
         return error.message;
      }
   }
}