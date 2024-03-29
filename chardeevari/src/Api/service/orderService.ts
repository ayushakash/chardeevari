import { config } from '../../config';

class OrderService {
  createOrder(token: any, orderDetails: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${config.API_BASEPATH}/order/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: orderDetails,
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

  getOrders(token: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${config.API_BASEPATH}/order/`, {
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

const orderService = new OrderService();
export default orderService;
