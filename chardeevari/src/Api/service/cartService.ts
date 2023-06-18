import { config } from '../../config';

class CartService {
  addToCart(token: any, cartDetails: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${config.API_BASEPATH}/cart/`, { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(cartDetails),
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

  getCartItems(token: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${config.API_BASEPATH}/cart/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
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

const cartService = new CartService();
export default cartService;
