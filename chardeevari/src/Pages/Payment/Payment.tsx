import React from "react";
import RazorpayPayment from "../../Components/razorpay";

const PaymentGateway: React.FC = () => {
  const handlePaymentSuccess = () => {
    // Handle successful payment
    console.log("Payment successful!");
  };

  const handlePaymentFailure = () => {
    // Handle payment failure
    console.log("Payment failed!");
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <RazorpayPayment
        amount={1000} // Amount in the smallest currency unit (e.g., paise for INR)
        currency="INR" // Currency code (e.g., INR, USD, EUR)
        onSuccess={handlePaymentSuccess}
        onFailure={handlePaymentFailure}
      />
    </div>
  );
};

export default PaymentGateway;
