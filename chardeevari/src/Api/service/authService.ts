class AuthService {
  userSignup(signupData: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      console.log(signupData);
      try {
        const response = await fetch("http://localhost:3001/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        });

        if (response.ok) {
          const data = await response.json();
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
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("http://localhost:3001/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });
  
        if (response.ok) {
          const data = await response.json();
          // Retrieve the 'auth-token' header from the response
          const authToken = response.headers.get("auth-token");
          console.log(authToken);
  
          // Set the 'token' cookie
          document.cookie = `token=${authToken}; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/`;
  
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
}  

const authService = new AuthService();
export default authService;
