import LoginGateway from "src/gateway/LoginGateway"

export default async function Login(loginData) {
   const loginStatus = await LoginGateway.login(loginData)
   if (loginStatus == 'login successfully') {
      let user = JSON.parse(localStorage.getItem('user'))
      return user.type
   }
   if (!(loginStatus == 'login successfully')) {
      return 'Bad Request'
   }
}  