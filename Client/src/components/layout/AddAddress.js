import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAddress, logout, addAddress } from '../../redux/userSlice';

const AddressList = () => {
  const addresses = useSelector((state) => state.user.addresses);
  const selectedAddress = useSelector((state) => state.user.selectedAddress); // access the entire address
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddAddress = () => {
    navigate('/addressform');
  };

  const handleDeleteAddress = (index) => {
    const newAddresses = [...addresses];
    newAddresses.splice(index, 1);

    // If the selected address is deleted, reset the selected address
    const newSelectedAddress = index === selectedAddress ? null : selectedAddress;

    dispatch(logout());  // Reset the state
    newAddresses.forEach((addr) => dispatch(addAddress(addr)));

    if (newSelectedAddress !== null) {
      dispatch(selectAddress(newAddresses.indexOf(newSelectedAddress))); // Store the selected address if it's still valid
    }
  };

  const handleSelectAddress = (index) => {
    dispatch(selectAddress(index));  // Now passing the index to store the entire address
  };

  return (
    <div className="p-4 max-w-2xl mx-auto ">
      <h2 className="text-xl font-semibold mb-4"> Saved Addresses</h2>

      {(!addresses || addresses.length === 0) ? (
        <p className="text-gray-500 mb-4">No addresses saved yet.</p>
      ) : (
        <ul className="space-y-4 mb-6 ">
          {addresses.map((address, index) => (
            <li
              key={index}
              className={`p-4 border rounded shadow-sm bg-white relative cursor-pointer transition hover:shadow-md ${
                selectedAddress && selectedAddress.name === address.name ? 'border-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => handleSelectAddress(index)}
            >
              <div>
                <p><strong>Name:</strong> {address.name}</p>
                <p><strong>Mobile:</strong> {address.mobile}</p>
                <p><strong>Address:</strong> {address.houseStreet}, {address.areaCity}, {address.pincode}, {address.stateName}</p>
                {address.landmark && <p><strong>Landmark:</strong> {address.landmark}</p>}
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteAddress(index);
                  }}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                   Delete
                </button>
              </div>
              {selectedAddress && selectedAddress.name === address.name && (
                <span className="absolute top-2 right-2 text-xs text-blue-600 font-semibold">Selected</span>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-center mt-6">
        <button
          onClick={handleAddAddress}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow"
        >
          + Add New Address
        </button>
      </div>
    </div>
  );
};

export default AddressList;
