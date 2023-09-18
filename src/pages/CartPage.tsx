import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import EmptyCart from "../components/cart/EmptyCart";
import CartItem from "../components/cart/CartItem";
import PriceSidebar from "../components/cart/PriceSidebar";
import SaveForLaterItem from "../components/cart/SaveForLaterItem";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { saveForLaterItems } = useSelector(
    (state: RootState) => state.saveforlater
  );

  const placeOrderHandler = () => {
    navigate("/checkout");
  };

  return (
    <>
      <main className="w-full mt-20">
        {/* <!-- row --> */}
        <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
          {/* <!-- cart column --> */}
          <div className="flex-1">
            {/* <!-- cart items container --> */}
            <div className="flex flex-col shadow bg-white">
              <span className="font-medium text-lg px-2 sm:px-8 py-4 border-b">
                My Cart ({cartItems.length})
              </span>

              {cartItems && cartItems.length === 0 && <EmptyCart />}

              {cartItems &&
                cartItems.map((item) => (
                  <CartItem
                    id={item.id}
                    category={item.category}
                    description={item.description}
                    image={item.image}
                    title={item.title}
                    rating={item.rating}
                    key={item.id}
                    product={item.title}
                    price={item.price}
                    quantity={item.quantity}
                    totalPrice={item.totalPrice}
                    inCart={true}
                    
                  />
                ))}

              {/* <!-- place order btn --> */}
              <div className="flex justify-end">
                <button
                  onClick={placeOrderHandler}
                  disabled={cartItems.length < 1 ? true : false}
                  className={`${
                    cartItems.length < 1
                      ? "bg-gray-200 cursor-not-allowed"
                      : "bg-[#385A64]"
                  } w-full sm:w-1/3 mx-2 sm:mx-6 my-4 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm`}
                >
                  PLACE ORDER
                </button>
              </div>
              {/* <!-- place order btn --> */}
            </div>
            {/* <!-- cart items container --> */}
            {/* <!-- saved for later items container --> */}
            <div className="flex flex-col mt-5 shadow bg-white">
              <span className="font-medium text-lg px-2 sm:px-8 py-4 border-b">
                Saved For Later ({saveForLaterItems.length})
              </span>
              {saveForLaterItems &&
                saveForLaterItems.map((item) => <SaveForLaterItem {...item} />)}
            </div>
            {/* <!-- saved for later container --> */}
          </div>
          {/* <!-- cart column --> */}

          <PriceSidebar cartItems={cartItems} />
        </div>
        {/* <!-- row --> */}
      </main>
    </>
  );
};

export default CartPage;
