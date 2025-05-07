import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAddress } from "../../redux/userSlice";

const AddressForm = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [pincode, setPincode] = useState('');
  const [houseStreet, setHouseStreet] = useState('');
  const [areaCity, setAreaCity] = useState('');
  const [landmark, setLandmark] = useState('');
  const [stateName, setStateName] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSaveAddress = () => {
    if (!name || !mobile || !pincode || !houseStreet || !areaCity || !stateName) {
      alert("❌ Please fill all the required fields!");
      return;
    }

    const newAddress = { name, mobile, pincode, houseStreet, areaCity, landmark, stateName };
    dispatch(addAddress(newAddress));
    alert(" Address saved ");
    navigate('/addaddress');
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center"> Add New Address</h2>

      <div className="space-y-4">
        {[
          { label: 'Full Name', value: name, set: setName },
          { label: 'Mobile Number', value: mobile, set: setMobile },
          { label: 'Pin Code', value: pincode, set: setPincode },
          { label: 'House No., Street', value: houseStreet, set: setHouseStreet },
          { label: 'Area / City', value: areaCity, set: setAreaCity },
          { label: 'Landmark (Optional)', value: landmark, set: setLandmark },
          { label: 'State', value: stateName, set: setStateName },
        ].map((field, idx) => (
          <div key={idx}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
            <input
              type="text"
              value={field.value}
              onChange={(e) => field.set(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => navigate('/addaddress')}
          className="px-5 py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveAddress}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Save Address
        </button>
      </div>
    </div>
  );
};

export default AddressForm;
