import { FaSignOutAlt } from 'react-icons/fa';
import { config } from '../../config';

class AuthService {
  userSignup(signupData: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      console.log(signupData);
      try {
        const response = await fetch(`${config.API_BASEPATH}/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          const authToken = response.headers.get("auth-token");
          console.log(authToken);
           // Store the token in local storage
           localStorage.setItem('token', JSON.stringify(authToken));

          resolve(data); // Resolve with the response data
        } else {
          const error = await response.text();
          reject(error); // Reject with the error message
        }
      } catch (error) {
        reject(error); // Reject with the error object
      }
    });
  }

  userLogin(loginData: any): Promise<any> {
    console.log("login data",config.API_BASEPATH);
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${config.API_BASEPATH}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        console.log(response)
  
        if (response.ok) {
          const data = await response.json();
          // Retrieve the 'auth-token' header from the response
          const authToken = response.headers.get("auth-token");
          console.log(authToken);
  
          // Store the token in local storage
          await localStorage.setItem('token', JSON.stringify(authToken));
          resolve(data); // Resolve with the response data
        } else {
          const error = await response.text();
          reject(error); // Reject with the error message
        }
      } catch (error) {
        reject(error); // Reject with the error object
      }
    });
  }

  userLogout(): void {
    try {
      // Clear the token from local storage
      localStorage.removeItem('token');
      console.log('Token removed from local storage');
      // You can perform any other necessary logout actions here
  
      // Resolve or perform any necessary actions after logout
    } catch (error) {
      console.error('Error while logging out:', error);
      // Reject or handle the error as needed
    }
  }
  



}  

const authService = new AuthService();
export default authService;
