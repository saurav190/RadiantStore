import { useSnackbar } from "notistack";
import { useState } from "react";
import { addItemToCart } from "../../redux/slices/cart/cartSlice";
import { removeFromSaveForLater } from "../../redux/slices/saveforlater/saveforlaterSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { CartItem } from "../../utils/types";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { useSelector } from "react-redux";

const SaveForLaterItem: React.FC<CartItem> = ({
  id,
  title,
  price,
  quantity,
  image,
  rating,
  description,
  category,
  totalPrice,
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

  const handleRemoveFromSaveForLater = () => {
    closeConfirmationDialog();
    dispatch(removeFromSaveForLater(id));
    enqueueSnackbar(`Successfully removed ${title.substring(0, 35)}... been Removed from your Saved Items!`, {
      variant: "success",
    });  };

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

  const moveToCartHandler = () => {
    dispatch(addItemToCart(cart));
    dispatch(removeFromSaveForLater(id));
    enqueueSnackbar(`You've Added ${title.substring(0, 35)}... with quantity ${quantity} successfully to your Cart!`, { variant: "success" });  };

  return (
    <div className="flex flex-col gap-3 py-5 pl-2 sm:pl-6 border-b" key={id}>
      <div className="flex flex-col sm:flex-row gap-5 items-stretch w-full">
        {/* <!-- product image --> */}
        <div className="w-full sm:w-1/6 h-28 flex-shrink-0">
          <img
            draggable={false}
            className="h-full w-full object-contain"
            src={image}
            alt={title}
          />
        </div>
        {/* <!-- product image --> */}

        {/* <!-- description --> */}
        <div className="flex flex-col gap-1 sm:gap-5 w-full p-1 pr-6">
          {/* <!-- product title --> */}
          <div className="flex justify-between items-start pr-5">
            <div className="flex flex-col gap-0.5 w-11/12 sm:w-full">
              <p>
                {title.length > 50 ? `${title.substring(0, 50)}...` : title}
              </p>
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
      </div>

      {/* <!-- move to cart --> */}
      <div className="flex justify-evenly sm:justify-start sm:gap-6">
        {/* <!-- quantity --> */}
        <div className="flex gap-1 items-center">
          <input
            className=" w-16 border outline-none text-center rounded-sm py-0.5 px-1 text-gray-700 font-medium text-sm"
            value="Quantity:"
            disabled
          />
          <input
            className="w-11 border outline-none text-center rounded-sm py-0.5 text-gray-700 font-medium text-sm"
            value={quantity}
            disabled
          />
        </div>
        {/* <!-- quantity --> */}
        <button
          onClick={moveToCartHandler}
          className="sm:ml-4 font-medium hover:text-primary-blue"
        >
          MOVE TO CART
        </button>
        <button
          onClick={openConfirmationDialog}
          className="font-medium hover:text-red-600"
        >
          REMOVE
        </button>
      </div>
      {/* <!-- move to cart --> */}

      {/* Dialog For Confirm Remove  */}
      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onClose={closeConfirmationDialog}
        onConfirm={handleRemoveFromSaveForLater}
        title="Confirm Remove"
        message="Are you sure you want to remove this item from your Saved Cart?"
      />
    </div>
  );
};

export default SaveForLaterItem;
