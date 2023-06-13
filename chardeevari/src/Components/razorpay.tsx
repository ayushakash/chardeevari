import React, { useEffect, useRef } from "react";

type RazorpayProps = {
  amount: number;
  currency: string;
  onSuccess: () => void;
  onFailure: () => void;
};

const RazorpayPayment: React.FC<RazorpayProps> = ({
  amount,
  currency,
  onSuccess,
  onFailure,
}) => {
  const razorpayRef = useRef<any>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = initializeRazorpay;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializeRazorpay = () => {
    const options = {
      key: "rzp_test_c0628KXaMc3u34",
    //   key: "s8XZfdKZ4gIEwLhDyPrPyLnM",
      amount: amount,
      currency: currency,
      name: "Chardeevari",
      description: "Payment for Order",
      image: "https://your-company-logo.png",
      handler: handlePaymentSuccess,
      prefill: {
        email: "user@example.com",
        contact: "9876543210",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpay: any = new (window as any).Razorpay(options); // Type assertion

    razorpay.on("payment.failed", handlePaymentFailure);
    razorpayRef.current = razorpay;
  };

  const openPaymentModal = () => {
    if (razorpayRef.current) {
      razorpayRef.current.open();
    }
  };

  const handlePaymentSuccess = (response: any) => {
    // Handle successful payment
    onSuccess();
  };

  const handlePaymentFailure = (response: any) => {
    // Handle payment failure
    onFailure();
  };

  return (
    <button onClick={openPaymentModal}>Pay with Razorpay</button>
  );
};

export default RazorpayPayment;
