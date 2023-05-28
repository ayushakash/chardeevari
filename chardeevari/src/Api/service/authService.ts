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
  }

  const authService = new AuthService()
  export default authService;