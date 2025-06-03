import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setFullPaymentDetails } from "../../redux/paymentSlice";

const BuyNowPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, variant } = location.state || {};
  const dispatch = useDispatch()
  const [selectedVariant, setSelectedVariant] = useState(variant);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiId, setUpiId] = useState("");
  const [upiVerified, setUpiVerified] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const user = useSelector((state) => state.user.user);
  const selectedAddress = useSelector((state) => state.user.selectedAddress);
  const products = useSelector((state) => state.stocks.items);

  
  

  useEffect(() => {
    if (product && !variant) {
      const productFromStore = products.find((p) => p.productId === product.productId);
      if (productFromStore) {
        setSelectedVariant(productFromStore.variants[0]);
      }
    }
  }, [product, variant, products]);

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
    setUpiId("");
    setUpiVerified(false);
    setSelectedBank("");
    setCardDetails({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      nameOnCard: "",
    });
  };

  const handleVerifyUpi = () => {
    if (upiId.trim() === "") {
      alert("Please enter a UPI ID.");
    } else {
      setUpiVerified(true);
      alert("UPI ID verified!");
    }
  };

 const handleContinueToPay = () => {
  if (paymentMethod === "UPI" && (!upiId || !upiVerified)) {
    alert("Please verify your UPI ID before proceeding.");
    return;
  }

  if (paymentMethod === "Net Banking" && !selectedBank) {
    alert("Please select a bank for Net Banking.");
    return;
  }

  if (paymentMethod === "Credit Card") {
    const { cardNumber, expiryDate, cvv, nameOnCard } = cardDetails;
    if (!cardNumber || !expiryDate || !cvv || !nameOnCard) {
      alert("Please fill in all credit card details.");
      return;
    }
  }

  // Dispatch one action to save all payment details at once
  dispatch(setFullPaymentDetails({
    method: paymentMethod,
    upiId,
    upiVerified,
    selectedBank,
    cardDetails,
  }));

  alert("Payment method selected sucessfully.");
  navigate('/confirmorder'); 
};

  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6">Buy Now</h1>
      <h2>Delivery to {user?.username}</h2>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Product Details</h2>
        <div className="flex items-center space-x-4">
          <img
            src={selectedVariant?.imageUrl}
            alt={selectedVariant?.SKU}
            className="w-24 h-24 object-cover"
          />
          <div>
            <h3 className="text-lg font-bold">{product?.productName}</h3>
            <p className="text-sm text-gray-600">{selectedVariant?.SKU}</p>
            <p className="text-sm text-gray-600">
              Price: ₹{selectedVariant?.specialPrice?.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Delivery Address</h2>
        <div className="p-4 bg-gray-100 rounded-md border">
          {selectedAddress ? (
            <p>{`${selectedAddress.name}, ${selectedAddress.houseStreet}, ${selectedAddress.areaCity}, ${selectedAddress.stateName}, ${selectedAddress.pincode}`}</p>
          ) : (
            <p className="text-red-500">No address selected</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
        <div className="space-y-3">
          {/* Credit card */}
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="Credit Card"
              checked={paymentMethod === "Credit Card"}
              onChange={handlePaymentChange}
            />
            <span>Credit Card</span>
          </label>

          {paymentMethod === "Credit Card" && (
  <div className="pl-6 space-y-3">
    <input
      type="text"
      placeholder="Card Number"
      className="w-full border border-gray-300 p-2 rounded"
      value={cardDetails.cardNumber}
      onChange={(e) =>
        setCardDetails({ ...cardDetails, cardNumber: e.target.value })
      }
    />
    <div className="flex gap-4">
      <input
        type="text"
        placeholder="Expiry Date (MM/YY)"
        className="w-1/2 border border-gray-300 p-2 rounded"
        value={cardDetails.expiryDate}
        onChange={(e) =>
          setCardDetails({ ...cardDetails, expiryDate: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="CVV"
        className="w-1/2 border border-gray-300 p-2 rounded"
        value={cardDetails.cvv}
        onChange={(e) =>
          setCardDetails({ ...cardDetails, cvv: e.target.value })
        }
      />
    </div>
    <input
      type="text"
      placeholder="Name on Card"
      className="w-full border border-gray-300 p-2 rounded"
      value={cardDetails.nameOnCard}
      onChange={(e) =>
        setCardDetails({ ...cardDetails, nameOnCard: e.target.value })
      }
    />
    <button
      onClick={() => {
        const { cardNumber, expiryDate, cvv, nameOnCard } = cardDetails;
        if (!cardNumber || !expiryDate || !cvv || !nameOnCard) {
          alert("Please fill in all credit card details before saving.");
        } else {
          alert("Card details saved successfully.");
        }
      }}
      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
    >
      Save Card
    </button>
  </div>
)}

{/* UPI */}
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={handlePaymentChange}
            />
            <span>UPI</span>
          </label>

          {paymentMethod === "UPI" && (
            <div className="pl-6">
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="Enter your UPI ID"
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />
              <button
                onClick={handleVerifyUpi}
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
              >
                Verify
              </button>
              {upiVerified && <p className="text-green-600 mt-2">UPI ID Verified</p>}
            </div>
          )}
{/* Net Banking */}
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="Net Banking"
              checked={paymentMethod === "Net Banking"}
              onChange={handlePaymentChange}
            />
            <span>Net Banking</span>
          </label>

          {paymentMethod === "Net Banking" && (
            <div className="pl-6 mt-2">
              <label className="block mb-2 text-sm font-medium text-gray-700">Select Bank:</label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">-- Choose a bank --</option>
                <option value="SBI">State Bank of India</option>
                <option value="HDFC">HDFC Bank</option>
                <option value="ICICI">ICICI Bank</option>
                <option value="Axis">Axis Bank</option>
                <option value="Kotak">Kotak Mahindra Bank</option>
              </select>
            </div>
          )}
{/* cash On delivery */}
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="Cash on Delivery"
              checked={paymentMethod === "Cash on Delivery"}
              onChange={handlePaymentChange}
            />
            <span>Cash on Delivery</span>
          </label>
        </div>
      </div>

      <button
  onClick={handleContinueToPay}
  disabled={!paymentMethod}
  className={`mt-6 w-[200px] text-white py-2 px-4 rounded transition ${
    !paymentMethod ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  Continue to Pay
</button>


    </div>
  );
};

export default BuyNowPage;
