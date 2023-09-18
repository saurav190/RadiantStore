import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { RootState, useAppDispatch } from '../redux/store';
import { CartItem } from '../utils/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

import img1 from '../assets/images/emptyCart.png'; // Import the empty order list image
import PDFGenerator from './EWayBill';
import { addItemToCart } from '../redux/slices/cart/cartSlice';

const OrdersListPage: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.checkout.cartItem);
  console.log(cartItems); 
  const dispatch = useAppDispatch();
  const handleBuyItAgain = (item: CartItem) => {
    dispatch(addItemToCart(item));
    navigate('/cart'); 
  };

  const handelInvoice = (itemId: number) => {
    navigate(`/ewaybill/${itemId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          <FontAwesomeIcon icon={faClipboardList} className="mr-2 text-blue-500" />
          Order Summary
        </h2>
       <div className="mb-4 text-right"> 
       <PDFGenerator />
     </div>
       {cartItems.length === 0 ? (
          <div className="text-center">
            <img src={img1} alt="Empty Order List" className="w-48 mx-auto mb-4" />
            <p>Your order list is empty.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded shadow">
              <thead className="bg-gray-200">
                <tr className="border-b">
                  <th className="py-3">Product</th>
                  <th className="py-3">Price</th>
                  <th className="py-3">Quantity</th>
                  <th className="py-3">Order ID</th>
                  <th className="py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item: CartItem) => (
                  <tr key={item.id} className="border-b">
                    <td className="flex items-center py-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-gray-600">Order Date: {new Date().toLocaleDateString()}</p>
                      </div>
                    </td>
                    <td className="text-center text-green-600 py-3">₹ {item.totalPrice.toFixed(2)}</td>
                    <td className="text-center font-bold py-3">{item.quantity}</td>
                    <td className="text-center py-3">{uuidv4()}</td>
                    <td className="text-center py-3">
                      <button
                        className="bg-yellow-400 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-yellow-500"
                        onClick={() => handleBuyItAgain(item)}
                      >
                        Buy It Again
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersListPage;
