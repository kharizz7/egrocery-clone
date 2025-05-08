import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function ConfirmOrderPage() {
  const location = useLocation();
  const { product, variant } = location.state || {};

  const paymentDetails = useSelector((state) => state.payment.paymentDetails);

  if (!paymentDetails) {
    return <div>Loading or Payment details are missing</div>;
  }

  return (
    <div className="confirm-order-container">
      <h2>Order Confirmation</h2>

      <div className="product-summary">
        <h3>Product Details</h3>
        <p><strong>Name:</strong> {product?.name}</p>
        <p><strong>Variant:</strong> {variant?.name}</p>
        <p><strong>Price:</strong> ₹{variant?.specialPrice}</p>
      </div>

      <div className="shipping-info">
        <h3>Shipping Address</h3>
        <p>{paymentDetails.shippingAddress}</p>
      </div>

      <div className="payment-info">
        <h3>Payment Method</h3>
        <p>{paymentDetails.paymentMethod}</p>

        {paymentDetails.paymentMethod === "UPI" && (
          <p><strong>UPI ID:</strong> {paymentDetails.upiId}</p>
        )}

        {paymentDetails.paymentMethod === "Net Banking" && (
          <p><strong>Bank:</strong> {paymentDetails.selectedBank}</p>
        )}

        {paymentDetails.paymentMethod === "Credit Card" && (
          <div>
            <p><strong>Card Holder:</strong> {paymentDetails.cardDetails.nameOnCard}</p>
            <p><strong>Card Number:</strong> **** **** **** {paymentDetails.cardDetails.cardNumber.slice(-4)}</p>
            <p><strong>Expiry:</strong> {paymentDetails.cardDetails.expiryDate}</p>
          </div>
        )}
      </div>

      <div className="total">
        <h3>Total Paid: ₹{paymentDetails.totalAmount}</h3>
      </div>

      <div className="thank-you">
        <p>🎉 Thank you for your order!</p>
      </div>
    </div>
  );
}
export default ConfirmOrderPage;
