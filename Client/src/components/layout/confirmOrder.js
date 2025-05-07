import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ConfirmOrderPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!state?.product || !state?.variant || !state?.address || !state?.paymentMethod) {
    return <div className="text-center text-red-500 mt-10">Missing order details.</div>;
  }

  const { product, variant, address, paymentMethod } = state;

  const handleFinalConfirm = () => {
    setIsConfirmed(true);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white shadow-md rounded-lg space-y-4">
      <h2 className="text-xl font-bold text-green-700">Order Summary</h2>
      <p><strong>Product:</strong> {product.productName} ({variant.SKU})</p>
      <p><strong>Amount to Pay:</strong> ₹{variant.specialPrice}</p>
      <p><strong>Delivery Address:</strong> {address}</p>
      <p><strong>Payment Method:</strong> {paymentMethod}</p>

      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-2"
        >
          Back
        </button>

        {!isConfirmed ? (
          <button
            onClick={handleFinalConfirm}
            disabled={isConfirmed}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            Confirm Order
          </button>
        ) : (
          <>
            <div className="text-green-600 font-semibold self-center">✅ Your order was confirmed!</div>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmOrderPage;
