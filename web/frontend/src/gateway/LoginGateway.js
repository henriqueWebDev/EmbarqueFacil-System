import LoginHttp from "src/http/LoginHttp"

export default class LoginGateway{
   constructor() {}
   
   static async login(loginData) {
      const loginHttp = new LoginHttp()
      try {
         const user = await loginHttp.post(loginData)
         localStorage.setItem('user', JSON.stringify(user.data))
         localStorage.setItem('token', user.token)
         return 'login successfully'
      } catch (error) {
         return error.message;
      }
   }
}