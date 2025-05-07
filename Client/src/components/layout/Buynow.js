import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const BuyNowPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const product = state?.product;
  const variant = state?.variant;

  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [isAddressSaved, setIsAddressSaved] = useState(false);


  // Payment-specific states
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  const [upiId, setUpiId] = useState('');
  const [isUpiVerified, setIsUpiVerified] = useState(false);

  const [bankDetails, setBankDetails] = useState({ bankName: '', loginId: '' });

  const handleConfirm = () => {
    if (!address) {
      alert("Please enter your delivery address.");
      return;
    }
  
    if (paymentMethod === 'Debit or Credit Card') {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
        alert("Please fill in all card details.");
        return;
      }
      window.location.href = "https://www.visa.com.in"; // Redirect to card payment page (Visa as example)
      return;
    }
  
    if (paymentMethod === 'UPI') {
      if (!upiId) {
        alert("Please enter your UPI ID.");
        return;
      }
      if (!isUpiVerified) {
        alert("Please verify your UPI ID before proceeding.");
        return;
      }
      window.location.href = "https://pay.google.com"; // Redirect to a UPI handler like GPay
      return;
    }
  
    if (paymentMethod === 'Net Banking') {
        if (!bankDetails.bankName) {
            alert("Please select your bank.");
            return;
          }
          
  
      // Open bank-specific page if known
      const bankUrls = {
        'State Bank of India': 'https://retail.onlinesbi.sbi/',
        'HDFC Bank': 'https://netbanking.hdfcbank.com/',
        'ICICI Bank': 'https://www.icicibank.com/net-banking',
        'Axis Bank': 'https://retail.axisbank.co.in/',
        'Punjab National Bank': 'https://www.pnbindia.in/',
        'Bank of Baroda': 'https://www.bankofbaroda.in/',
        'Canara Bank': 'https://canarabank.com/',
        'Kotak Mahindra Bank': 'https://www.kotak.com/',
        'Union Bank of India': 'https://www.unionbankofindia.co.in/',
        'IndusInd Bank': 'https://www.indusind.com/',
        'Yes Bank': 'https://www.yesbank.in/',
        'IDFC FIRST Bank': 'https://www.idfcfirstbank.com/',
      };
      
      const selectedBankUrl = bankUrls[bankDetails.bankName];
      if (selectedBankUrl) {
        window.location.href = selectedBankUrl;
      }
      
      
      return;
    }
  
    // confirm order page naviagtion
    navigate('/confirmorder', {
        state: {
          product,
          variant,
          address,
          paymentMethod,
        }
      });
      
  };
  

  if (!product || !variant) {
    return <div className="text-center text-red-600 mt-10">Invalid product information</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Confirm Your Order</h1>

      <div className="flex flex-col sm:flex-row gap-6">
        <img
          src={variant.imageUrl}
          alt={variant.SKU}
          className="w-full sm:w-60 h-60 object-contain rounded-lg border"
        />
        <div className="flex-1 space-y-2">
          <h2 className="text-xl font-semibold">{product.productName}</h2>
          <p className="text-gray-600 text-sm">{product.description}</p>
          <div className="text-green-600 font-bold text-lg">
            ₹{variant.specialPrice}{' '}
            <span className="text-gray-400 line-through text-sm ml-2">₹{variant.MRP}</span>
          </div>
          <div className="text-sm text-gray-500">Variant: {variant.SKU}</div>
        </div>
      </div>

      {/* Address Input */}
      <div className="space-y-2">
       
  <label className="block font-medium">Delivery Address</label>
  <textarea
    className="w-full border border-gray-400 rounded-md p-3 bg-blue-200"
    rows={4}
    value={address}
    placeholder="Enter your full delivery address"
    onChange={(e) => {
      setAddress(e.target.value);
      setIsAddressSaved(false); 
    }}
  />

  <div className="flex justify-end">
    <button
      onClick={() => {
        if (address.trim()) {
          setIsAddressSaved(true);
          alert("✅ Address saved successfully.");
        } else {
          alert("❌ Please enter a valid address.");
        }
      }}
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md"
    >
      Save Address
    </button>
  </div>

  {isAddressSaved && (
    <p className="text-green-600 text-sm">Address saved.</p>
  )}
</div>



      {/* Radio Button Payment Selection */}
      <div>
        <label className="block font-medium mb-2">Select Payment Method</label>
        <div className="space-y-2">
          {['Cash on Delivery', 'Debit or Credit Card', 'UPI', 'Net Banking'].map((method) => (
            <label key={method} className="flex items-center space-x-3">
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="text-gray-700">{method}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Conditional Inputs */}
      {paymentMethod === 'Debit or Credit Card' && (
        <div className="space-y-4">
          <input
            type="text"
            className="w-full border p-3 rounded-md"
            placeholder="Card Number"
            value={cardDetails.number}
            onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
          />
          <input
            type="text"
            className="w-full border p-3 rounded-md"
            placeholder="Expiry Date (MM/YY)"
            value={cardDetails.expiry}
            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
          />
          <input
            type="password"
            className="w-full border p-3 rounded-md"
            placeholder="CVV"
            value={cardDetails.cvv}
            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
          />
        </div>
      )}

{paymentMethod === 'UPI' && (
  <div className="space-y-2">
    <label className="block text-sm font-medium mb-1">Enter UPI ID</label>
    <div className="flex gap-2">
      <input
        type="text"
        className="flex-1 border p-3 rounded-md"
        placeholder="example@upi"
        value={upiId}
        onChange={(e) => {
          setUpiId(e.target.value);
          setIsUpiVerified(false); // reset on change
        }}
      />
      <button
        onClick={() => {
          if (upiId.includes('@')) {
            setIsUpiVerified(true);
            alert("✅ UPI ID Verified");
          } else {
            setIsUpiVerified(false);
            alert("❌ Invalid UPI ID. Please include '@'.");
          }
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 rounded-md"
      >
        Verify
      </button>
    </div>
    {isUpiVerified && (
      <p className="text-green-600 text-sm">UPI ID Verified</p>
    )}
  </div>
)}

{paymentMethod === 'Net Banking' && (
  <div className="space-y-4">
    <select
      className="w-full border p-3 rounded-md"
      value={bankDetails.bankName}
      onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
    >
      <option value="">Select your bank</option>
      <option value="State Bank of India">State Bank of India</option>
      <option value="HDFC Bank">HDFC Bank</option>
      <option value="ICICI Bank">ICICI Bank</option>
      <option value="Axis Bank">Axis Bank</option>
      <option value="Punjab National Bank">Punjab National Bank</option>
      <option value="Bank of Baroda">Bank of Baroda</option>
      <option value="Canara Bank">Canara Bank</option>
      <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
      <option value="Union Bank of India">Union Bank of India</option>
      <option value="IndusInd Bank">IndusInd Bank</option>
      <option value="Yes Bank">Yes Bank</option>
      <option value="IDFC FIRST Bank">IDFC FIRST Bank</option>
    </select>

    <input
      type="text"
      className="w-full border p-3 rounded-md"
      placeholder="Enter Net Banking Login ID"
      value={bankDetails.loginId}
      onChange={(e) => setBankDetails({ ...bankDetails, loginId: e.target.value })}
    />
  </div>
)}



      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-4">
  <button
    className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded-lg"
    onClick={() => navigate(-1)}
  >
    Cancel
  </button>
  <button
    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg"
    onClick={handleConfirm}
  >
    {paymentMethod === 'Cash on Delivery' ? 'Confirm Order' : 'Pay Now'}
  </button>
</div>

    </div>
  );
};

export default BuyNowPage;
