class UserService {
    addAddress(address:any,token:any) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await fetch(`http://localhost:3001/address/${token}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(address),
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
  
    updateAddress(address:any) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await fetch(`http://localhost:3001/address/${address.userId}/${address.addressId}`, {  //send token here
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(address),
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
  
    getAddress(userId:any) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await fetch(`http://localhost:3001/address/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
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
  
  const userService = new UserService();
  export default userService;
  