import React from "react";
import { useSelector } from "react-redux";

function ConfirmOrderPage() {
  const product = useSelector((state) => state.selectedProduct.product);
  const paymentDetails = useSelector((state) => state.payment);
  const selectedAddress = useSelector((state) => state.user.selectedAddress);

  const deliveryCharge = 50; // Fixed delivery charge

  const variant = product.variants && product.variants.length > 0 ? product.variants[0] : null;
  const price = Number(variant?.specialPrice || product.specialPrice || 0);
  const totalPaid = price + deliveryCharge;

  const handleConfirmOrder = () => {
    // Handle order confirmation logic here (API call, state update, redirect, etc.)
    alert("✅ Your order has been confirmed!");
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md mt-12 font-sans">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">Order Confirmation</h2>

      {/* Product Section */}
      <section className="mb-8 border-b border-gray-200 pb-6">
        <h3 className="text-xl font-medium text-gray-700 mb-4">Product Details</h3>
        <p><strong>Name:</strong> <span className="text-gray-900">{product.productName || "N/A"}</span></p>
        <p>
          <strong>Price:</strong>{" "}
          <span className="text-green-600 font-semibold">₹{price}</span>
        </p>
      </section>

      {/* Address Section */}
      <section className="mb-8 border-b border-gray-200 pb-6">
        <h3 className="text-xl font-medium text-gray-700 mb-4">Shipping Address</h3>
        <p><strong>Name:</strong> {selectedAddress.name}</p>
        <p><strong>Mobile:</strong> {selectedAddress.mobile}</p>
        <p><strong>Address:</strong> {selectedAddress.houseStreet}, {selectedAddress.areaCity}, {selectedAddress.stateName} - {selectedAddress.pincode}</p>
        {selectedAddress.landmark && <p><strong>Landmark:</strong> {selectedAddress.landmark}</p>}
      </section>

      {/* Payment Section */}
      <section className="mb-8 border-b border-gray-200 pb-6">
        <h3 className="text-xl font-medium text-gray-700 mb-4">Payment Method</h3>

        {paymentDetails.paymentMethod === "UPI" && (
          <p><strong>UPI ID:</strong> {paymentDetails.upiId || "N/A"}</p>
        )}

        {paymentDetails.paymentMethod === "Net Banking" && (
          <p><strong>Bank:</strong> {paymentDetails.selectedBank || "N/A"}</p>
        )}

        {paymentDetails.paymentMethod === "Credit Card" && (
          <div>
            <p><strong>Card Holder:</strong> {paymentDetails.cardDetails?.nameOnCard || "N/A"}</p>
            <p>
              <strong>Card Number:</strong> 
              {paymentDetails.cardDetails?.cardNumber
                ? `**** **** **** ${paymentDetails.cardDetails.cardNumber.slice(-4)}`
                : "N/A"}
            </p>
            <p><strong>Expiry:</strong> {paymentDetails.cardDetails?.expiryDate || "N/A"}</p>
          </div>
        )}

        {paymentDetails.paymentMethod === "Cash on Delivery" && (
          <p>Cash on Delivery selected.</p>
        )}
      </section>

      {/* Delivery Charge Section */}
      <section className="mb-4">
        <h3 className="text-lg font-medium text-gray-800">Delivery Charge:</h3>
        <p className="text-gray-700">₹{deliveryCharge}</p>
      </section>

      {/* Total Paid Section */}
      <section className="total">
        <h3 className="text-xl font-semibold text-gray-900">
          Total Paid: ₹{totalPaid.toFixed(2)}
        </h3>
      </section>

      {/* Thank You Section */}
      <section className="thank-you mt-6 text-center text-green-700 font-semibold">
        <p> Check your order!</p>
      </section>

      {/* Confirm Order Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleConfirmOrder}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}

export default ConfirmOrderPage;
