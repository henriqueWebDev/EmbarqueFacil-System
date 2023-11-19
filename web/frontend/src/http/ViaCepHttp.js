import axios from "src/boot/axios"

export default class ViaCepHttp {
   constructor () {}

   async get(cep) {
      try {
         const response = (await fetch(`https://viacep.com.br/ws/${cep}/json/`)).json()
         return response
      } catch (error) {
         throw error
      }
   }
}