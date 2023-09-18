import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import img1 from '../assets/images/emptyCart.png'; // Corrected import

import {
  addToWishlist,
  removeProductFromWishlist,
} from '../redux/slices/wishList/wishlistSlice';
import { addItemToCart } from '../redux/slices/cart/cartSlice';
import { RootState } from '../redux/store';
import { CartItem } from '../utils/types';
const WishlistPage: React.FC = () => {
  const wishlist = useSelector((state: RootState) => state.wishList);
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const [itemToDelete, setItemToDelete] = useState<CartItem | null>(null);

  const handleAddToWishlist = (productData: CartItem) => {
    dispatch(addToWishlist(productData));
  };

  const handleRemoveFromWishlist = (product: CartItem) => {
    setItemToDelete(product);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      dispatch(removeProductFromWishlist(itemToDelete));
      enqueueSnackbar(
        `${itemToDelete.title} has been removed from your wishlist.`,
        { variant: 'success' }
      );
    }
    setItemToDelete(null);
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
  };
  const handleAddToCart = (product: CartItem) => {
    const cartItem: CartItem = {
      id: product.id,
      category: product.category,
      description: product.description,
      image: product.image,
      title: product.title,
      price: product.price,
      rating: product.rating,
      quantity: 1,
      totalPrice: product.price,

    };
    dispatch(addItemToCart(cartItem));
    enqueueSnackbar(
      `You've Added ${product.title.substring(0, 55)}... successfully to your Cart!`,
      { variant: 'success' }
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6 flex items-center justify-center text-center">
          Your Wishlist{' '}
          <FontAwesomeIcon icon={faHeart} className="ml-2 text-red-600" />
        </h2>
        {wishlist.length === 0 ? (
          <div className="text-center flex flex-col items-center">
          <img
            src={img1}
            alt="Empty Wishlist"
            className="w-1/2 h-96 mx-auto mb-4"
          />
          <div className="flex flex-col items-center">
            <p className="mt-2">Your wishlist is empty.</p>
            <NavLink
              to="/"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-2"
            >
              Go to Home Page
            </NavLink>
          </div>
        </div>
        ) : (
          <div className="table-responsive">
            <table className="w-full bg-white rounded shadow">
              <thead className="bg-gray-200">
                <tr className="border-b">
                  <th className="py-3">Image</th>
                  <th className="py-3">Product Name</th>
                  <th className="py-3">Price</th>
                  <th className="py-3">Delete</th>
                  <th className="py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map((product: CartItem) => (
                  <tr key={product.id} className="border-b">
                    <td className="text-center">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-24 h-28 object-cover mx-auto p-3"
                      />
                    </td>
                    <td>
                      <h3 className="text-lg font-semibold">{product.title}</h3>
                    </td>
                    <td className="text-lg font-semibold text-green-600 text-center">
                      ₹. {product.price}
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => handleRemoveFromWishlist(product)}
                        className="text-red-600 hover:text-red-800 transition duration-300 ease-in-out"
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="h-5 w-5 inline-block align-middle"
                        />
                      </button>
                    </td>
                    <td className="text-center">
                      <button
                        className={`bg-[#385A64] w-full sm:w-1/3 mx-2 sm:mx-6 my-4 py-3 font-medium text-white shadow hover:shadow-lg rounded-lg`}
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {itemToDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white p-5 rounded shadow">
              <p className="mb-4">Are you sure you want to remove {itemToDelete.title}?</p>
              <div className="flex justify-between">
                <button
                  onClick={handleCancelDelete}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
