import { useSnackbar } from "notistack";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  decrementCartItem,
  emptyItemFromCart,
  incrementCartItem,
} from "../../redux/slices/cart/cartSlice";
import { addToSaveForLater } from "../../redux/slices/saveforlater/saveforlaterSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { getDeliveryDate } from "../../utils/functions";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
interface CartItemProps {
  product: string;
  price: number;
  quantity: number;
  inCart: boolean;
  totalPrice: number;
  id: number;
  category: string;
  description: string;
  image: string;
  title: string;
  rating: {
    rate: number;
    count: number;
  };
}

const CartItem: React.FC<CartItemProps> = ({
  product,
  price,
  image,
  title,
  quantity,
  inCart,
  id,
  totalPrice,
  rating,
  description,
  category,
}) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);


  const openConfirmationDialog = () => {
    setIsConfirmationOpen(true);
  };

  const closeConfirmationDialog = () => {
    setIsConfirmationOpen(false);
  };

  const removeItemHandler = () => {
    closeConfirmationDialog();
    dispatch(emptyItemFromCart(id));
    enqueueSnackbar(`Successfully removed ${title.substring(0, 35)}... been Removed from your cart`, {
      variant: "success",
    });
  };
  const decreseCart = () => {
    dispatch(decrementCartItem(id));
    enqueueSnackbar(`You've changed ${title.substring(0, 35)}... QUANTITY to '${quantity - 1}'`, { variant: "success",
  });
  };
  const cart = {
    id: id,
    category: category,
    description: description,
    image: image,
    title: title,
    price: price,
    rating: rating,
    quantity: quantity,
    totalPrice: totalPrice,
  };
  const increaseCart = () => {
    dispatch(incrementCartItem(id));
    enqueueSnackbar(`You've changed ${title.substring(0, 35)}... QUANTITY to '${quantity + 1}'`, { variant: "success",
  });
  };
  const handleAddToSaveForLater = () => {
    dispatch(emptyItemFromCart(id));
    dispatch(addToSaveForLater(cart));
    enqueueSnackbar(`You've Added ${title.substring(0, 35)}... with Quantity ${quantity} for the Saved Later!`, { variant: "success" });
  };

  

  //print star logic
  const fullStars = Math.floor(rating.rate);
  const hasHalfStar = rating.rate - fullStars >= 0.5;

  const fullStarIcons = Array.from({ length: fullStars }).map((_, index) => (
    <FontAwesomeIcon
      key={index}
      icon={faStar}
      className="w-4 h-4 text-indigo-500"
    />
  ));
  const halfStarIcon = hasHalfStar && (
    <FontAwesomeIcon
      key="half-star"
      icon={faStarHalf}
      className="w-4 h-4 text-indigo-500"
    />
  );

  return (
    <div
      className="flex flex-col gap-3 py-5 pl-2 sm:pl-6 border-b overflow-hidden"
      key={product}
    >
      <Link
        to={`/productDetails/${id}`}
        className="flex flex-col sm:flex-row gap-5 items-stretch w-full group"
      >
        {/* <!-- product image --> */}
        <div className="w-full sm:w-1/6 h-28 flex-shrink-0">
          <img
            draggable="false"
            className="h-full w-full object-contain"
            src={image}
            alt={title}
          />
        </div>
        {/* <!-- product image --> */}

        {/* <!-- description --> */}
        <div className="flex flex-col sm:gap-5 w-full pr-6">
          {/* <!-- product title --> */}
          <div className="flex flex-col sm:flex-row justify-between items-start pr-5 gap-1 sm:gap-0">
            <div className="flex flex-col gap-0.5 sm:w-3/5">
              <p className="group-hover:text-primary-blue">
                {title.length > 42 ? `${title.substring(0, 42)}...` : title}
              </p>
              <div className="flex mb-4">
                <span className="flex items-center">
                  {fullStarIcons}
                  {halfStarIcon}
                  <span className="text-gray-600 ml-3 my-2">
                    {rating.count} Reviews
                  </span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:gap-2">
              <p className="text-sm">
                Delivery by {getDeliveryDate()} |{" "}
                <span className="text-primary-green">Free</span>{" "}
                <span className="line-through">₹{quantity * 40}</span>
              </p>
              <span className="text-xs text-gray-500">
                7 Days Replacement Policy
              </span>
            </div>
          </div>
          {/* <!-- product title --> */}

          {/* <!-- price desc --> */}
          <div className="flex items-baseline gap-2 text-xl font-medium">
            <span>₹{(price * quantity).toLocaleString()}</span>
          </div>
          {/* <!-- price desc --> */}
        </div>
        {/* <!-- description --> */}
      </Link>

      {/* <!-- save for later --> */}
      <div className="flex justify-between pr-4 sm:pr-0 sm:justify-start sm:gap-6">
        {/* <!-- quantity --> */}
        <div className="flex gap-1 items-center">
          <span
            onClick={decreseCart}
            className={`${
              quantity <= 1
                ? "cursor-not-allowed bg-gray-200"
                : "cursor-pointer bg-[#385A64]"
            } w-7 h-7 text-xl font-light  rounded-full border text-white flex items-center justify-center `}
            aria-disabled={quantity <= 1 ? "true" : "false"}
          >
            <p>-</p>
          </span>
          <input
            className="w-11 border outline-none text-center rounded-sm py-0.5 text-gray-700 font-medium text-sm qtyInput"
            value={quantity}
            disabled
          />
          <span
            onClick={increaseCart}
            className="w-7 h-7 text-xl font-light bg-[#385A64] text-white rounded-full border flex items-center justify-center cursor-pointer"
          >
            +
          </span>
        </div>
        {/* <!-- quantity --> */}
        {inCart && (
          <>
            <button
              onClick={handleAddToSaveForLater}
              className="sm:ml-4 font-medium hover:text-primary-blue"
            >
              SAVE FOR LATER
            </button>
            <button
              onClick={openConfirmationDialog}
              className="font-medium hover:text-red-600"
            >
              REMOVE
            </button>
          </>
        )}
      </div>
      {/* <!-- save for later --> */}
      {/* dialog with confirmation on remove cart */}
      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onClose={closeConfirmationDialog}
        onConfirm={removeItemHandler}
        title="Confirm Remove"
        message="Are you sure you want to remove this item from your cart?"
      />
    </div>
  );
};

export default CartItem;
