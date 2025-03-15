import axios from "axios";

const base_url = 'https://prod.wheelz365.com/';


class SignInService {

   async triggerForgotPassword(user_id) {
      try {
         const response = await axios.get(`${base_url}auth/trigger/password/${user_id}`);
         return response.data.data;
      } catch (err) {
         console.error(`Error in triggering new password \n` + err);
         throw new Error(`Error in triggering new password`);
      }
      
   }

   async checkIfIdPresent(id) {
      try {
         const response = await axios.get(`${base_url}auth/id/${id}`);
         return response.data.data;
      } catch (err) {
         console.error(`Error in checking if user present \n` + err);
         throw new Error(`Error in checking data`);
      }
   }

   async login( id, password) {
      try {
         const response = await axios.post(`${base_url}auth/login`, {login_id: id, password});
         if(!response.status) throw new Error(response?.error);
         return response.data.data;
      } catch (err) {
         console.error(`Error in verifying login cred ${err}`);
         throw new Error(`Error in verifying creds`);
      }
   }
  
   async signup(id, password, refferCode) {
      try {
         const response = await axios.post(`${base_url}auth/signup`, {id, password, refferCode});
         return response.data;
      } catch (err) {
         console.error(`Error in sign up ${err}`);
         throw new Error(`Error SignUp`)
      }
   }

   async logout(){
      
   }
}

export default new SignInService();