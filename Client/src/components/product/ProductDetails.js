import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { setSingleProduct } from '../../redux/selectedProductSlice';
import BuyNowModal from '../layout/Buynow';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  const products = useSelector((state) => state.stocks.items);
  const product = products.find(p => p.productId === id);

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    if (product) {
      dispatch(setSingleProduct(product));
      setSelectedVariant(product.variants[0]); // Default variant
    }
  }, [product, dispatch]);

  if (!product || !selectedVariant) {
    return <div className="text-center text-gray-500 mt-10">Product not found</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col lg:flex-row gap-10">
      {/* Left Column - Product Image */}
      <div className="flex-1">
        <img
          src={selectedVariant.imageUrl}
          alt={selectedVariant.SKU}
          className="w-full h-[400px] object-contain rounded-lg border"
        />
      </div>

      {/* Right Column - Product Info */}
      <div className="flex-1 flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-gray-800">{product.productName}</h2>
        <p className="text-gray-600">{product.description || "No description available"}</p>

        <div className="flex flex-wrap gap-2">
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase tracking-wide">
            {product.category}
          </span>
          {product.badge && (
            <span className="bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full">
              {product.badge}
            </span>
          )}
        </div>

        {/* Price and Stock */}
        <div className="text-xl text-green-600 font-semibold">
          ₹{selectedVariant.specialPrice} &nbsp;
          <span className="text-sm line-through text-gray-400">
            ₹{selectedVariant.MRP}
          </span>
        </div>
        <div className={`text-sm ${selectedVariant.inStock ? 'text-green-600' : 'text-red-500'}`}>
          {selectedVariant.inStock ? 'In Stock' : 'Out of Stock'}
        </div>

        {/* Variant Selector */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Choose Variant:</h3>
          <div className="flex flex-wrap gap-4">
            {product.variants.map((variant) => (
              <button
                key={variant._id}
                onClick={() => setSelectedVariant(variant)}
                className={`p-2 border rounded-lg text-sm ${
                  selectedVariant._id === variant._id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300'
                }`}
              >
                {variant.SKU}
              </button>
            ))}
          </div>
        </div>

        {/* Buy Now */}
        <button
  className="mt-6 w-full sm:w-40 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
  disabled={!selectedVariant.inStock}
  onClick={() => navigate('/buynow', { state: { product, variant: selectedVariant } })}
>
  {selectedVariant.inStock ? 'Buy Now' : 'Out of Stock'}
</button>

      </div>
    </div>
  );
};

export default ProductDetail;
