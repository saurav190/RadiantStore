import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faCartShopping,
  faChevronDown,
  faChevronUp,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { RootState } from "../../redux/store";
import Searchbar from "./Searchbar";
import UserProfile from "./UserProfile";

const Header: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.userAuth);
  const user: any = useSelector((state: RootState) => state.userAuth.login);
  const wishlist = useSelector((state: RootState) => state.wishList);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const [togglePrimaryDropDown, setTogglePrimaryDropDown] = useState(false);

  return (
    <header className="bg-[#385A64] sticky top-0 py-2.5 w-full z-10">
      <div className="w-full sm:w-9/12 px-1 sm:px-4 m-auto flex justify-evenly items-center relative">
        <div className="flex items-center flex-1 gap-4">
          <Link
            className="h-7 mr-1 sm:mr-4 flex items-center justify-center"
            to="/"
          >
            <FontAwesomeIcon
              className="bg-[#385A64] rounded-full text-2xl h-full text-white w-full object-contain"
              icon={faStore}
            /><span className="text-white md:block hidden text-xl">Store</span>
          </Link>
          <Searchbar />
        </div>
        <div className="flex items-center justify-between ml-1 sm:ml-0 gap-0.5 sm:gap-7 relative">
        {isAuthenticated === false ? (
            <Link
              to="/login"
              className="px-3 sm:px-9 py-0.5 text-primary-blue bg-white border font-medium rounded-sm cursor-pointer"
            >
              Login
            </Link>
          ) : (
            <span
              className="userDropDown border border-white rounded-sm px-3 py-0.5 flex items-center text-white font-medium gap-1 cursor-pointer"
              onClick={() => setTogglePrimaryDropDown(!togglePrimaryDropDown)}
            >
              {user.name}
              <span>
                {togglePrimaryDropDown ? (
                  <FontAwesomeIcon className=" text-base" icon={faChevronUp} />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} />
                )}
              </span>
            </span>
          )}
          <NavLink
            to="/cart"
            className="flex items-center text-white font-medium gap-2 relative"
          >
            <span>
              <FontAwesomeIcon className="text-2xl" icon={faCartShopping} />
            </span>
            {totalQuantity > 0 && (
              <div className="w-5 h-5 p-2 bg-red-500 text-xs rounded-full absolute -top-2 left-3 flex justify-center items-center border">
                {totalQuantity}
              </div>
            )}
            <span className="md:block hidden">Cart</span>
          </NavLink>
          <NavLink
            to="/wishlist"
            className="flex items-center text-white font-medium gap-2 relative"
          >
            <div className="relative">
              <FontAwesomeIcon className="text-2xl text-white" icon={faHeart} />

              {wishlist.length > 0 && (
                <span className="w-5 h-5 p-2 bg-red-500 text-xs rounded-full absolute -top-2 left-3 flex justify-center items-center border">
                  {wishlist.length}
                </span>
              )}
            </div>
            <span className="md:block hidden">WishList</span>
          </NavLink>


          {togglePrimaryDropDown && (
            <UserProfile setTogglePrimaryDropDown={setTogglePrimaryDropDown} />
          )}

        </div>
      </div>
    </header>
  );
};

export default Header;
