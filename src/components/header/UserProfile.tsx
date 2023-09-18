import {
    faComment,
    faHeart,
    faRightFromBracket,
    faShoppingBag,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSnackbar } from "notistack";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../redux/slices/useAuth/userAuth";
import { RootState } from "../../redux/store";

interface NavItem {
  title: string;
  icon: JSX.Element;
  redirect: string;
}

interface PrimaryDropDownMenuProps {
  setTogglePrimaryDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserProfile: React.FC<PrimaryDropDownMenuProps> = ({
  setTogglePrimaryDropDown,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const popupRef = useRef<HTMLDivElement | null>(null);
  const wishlist = useSelector((state: RootState) => state.wishList);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
    localStorage.removeItem("loginuser");
    enqueueSnackbar("Logout Successfully", { variant: "success" });
    setTogglePrimaryDropDown(false);
  };

  const handleCloseMenu = () => {
    setTogglePrimaryDropDown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        handleCloseMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navs: NavItem[] = [
    {
      title: "Orders",
      icon: <FontAwesomeIcon icon={faShoppingBag} size="lg" />,
      redirect: "/orderlist",
    },
    {
      title: "Wishlist",
      icon: (
        <span className="text-primary-blue">
          <FontAwesomeIcon icon={faHeart} size="lg" />
        </span>
      ),
      redirect: "/wishlist",
    },
    {
      title: "Support",
      icon: <FontAwesomeIcon icon={faComment} size="lg" />,
      redirect: "/support",
    },
  ];

  return (
    <div
      ref={popupRef}
      className="absolute w-60 -left-24  ml-2 top-9 z-50 bg-white shadow-2xl rounded flex-col text-sm"
    >
      <Link
        onClick={handleCloseMenu}
        className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50 rounded-t"
        to="/profile"
      >
        <FontAwesomeIcon icon={faUser} />
        My Profile
      </Link>

      {navs.map((item, i) => {
        const { title, icon, redirect } = item;

        return (
          <Link
            onClick={handleCloseMenu}
            className="pl-3 py-3.5 border-b flex gap-3 items-center hover:bg-gray-50"
            to={redirect}
            key={i}
          >
            {title === "Wishlist" ? (
              <>
                <span className="text-primary-blue">{icon}</span>
                {title}
                <span className="ml-auto mr-3 bg-gray-100 p-0.5 px-2 text-gray-600 rounded">
                  {wishlist.length}
                </span>
              </>
            ) : (
              <>
                <span className="text-primary-blue">{icon}</span>
                {title}
              </>
            )}
          </Link>
        );
      })}

      <div
        className="pl-3 py-3.5 flex gap-3 items-center hover:bg-gray-50 rounded-b cursor-pointer"
        onClick={handleLogout}
      >
        <FontAwesomeIcon icon={faRightFromBracket} />
        Logout
      </div>

      <div className="absolute right-1/2 -top-2.5">
        <div className="arrow_down"></div>
      </div>
    </div>
  );
};

export default UserProfile;
