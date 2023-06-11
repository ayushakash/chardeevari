class OrderService{

    createOrder (token:any,orderDetails:any){
        return new Promise(async (resolve, reject) => {
            try {
              const response = await fetch(`http://localhost:3001/order/`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`, 
                },
                body: (orderDetails),
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




const orderService = new OrderService 
export default orderService

