import { productData } from "../redux/slices/product/productSlice";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import imgRight from "../assets/images/sec-desktop-g.jpg";
import imgLeft from "../assets/images/sec-desktop-g.jpg";
import Spinner from "../components/common/Spinner";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/slices/wishList/wishlistSlice";
import "../assets/css/homepage.css";
import bannerThree from "../assets/images/banner-1.jpg";
import bannerTwo from "../assets/images/banner-2.jpg";
import bannerOne from "../assets/images/banner-3.jpg";
import { AppDispatch, RootState } from "../redux/store";
import { addItemToCart } from "../redux/slices/cart/cartSlice";
import { CartItem, User } from "../utils/types";
import { useSnackbar } from "notistack";
import setSort from "../redux/slices/product/productSlice";
import { setFilteredProducts } from "../redux/slices/category/categorySlice";
import fashion from "../assets/images/Categories/download.jpeg";
import fashionTwo from "../assets/images/Categories/images.jpeg";
import electronics from "../assets/images/Categories/download (3).jpeg";
import home from "../assets/images/Categories/images (3).jpeg";
import { useNavigate } from "react-router-dom";
import { productDataState } from "../utils/types";
import { Product } from "../utils/types";
import { CategoryItem } from "../utils/types";

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // ---------------------catgory filtered------------------------------------
  const productDataCat = useSelector((state: RootState) => state.product.data);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const catNav: CategoryItem[] = [
    {
      name: "men's clothing",
      icon: fashion,
    },
    {
      name: "electronics",
      icon: electronics,
    },
    {
      name: "women's clothing",
      icon: fashionTwo,
    },
    {
      name: "jewelery",
      icon: home,
    },
  ];
  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    if (categoryRef.current) {
      categoryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (selectedCategory === "") {
      dispatch(setFilteredProducts(productDataCat));
    } else {
      const filtered = productDataCat.filter(
        (product) => product.category === selectedCategory
      );
      dispatch(setFilteredProducts(filtered));
      console.log(filtered);
    }
  }, [selectedCategory, productDataCat, dispatch]);
  // -------------------------catgory filtered------------------------------------
  useEffect(() => {
    dispatch(productData());
  }, [dispatch]);

  const productDataState = useSelector(
    (state: RootState) => state.product.data
  );
  const loading = useSelector((state: RootState) => state.product.loading);

  const wishList = useSelector((state: RootState) => state.wishList);
  const categoryData = useSelector(
    (state: RootState) => state.category.filteredProducts
  );

  const handleWishlistToggle = (product: CartItem) => {
    const isProductInWishlist = wishList.find((item) => item.id === product.id);

    if (isProductInWishlist) {
      // If the product is already in the wishlist
      dispatch(removeFromWishlist(product));
    } else {
      // If the product is not in the wishlist
      dispatch(addToWishlist(product));
    }
  };

  const [sortingOption, setSortingOption] = useState<string>("all");
  const handleSortingOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortingOption(event.target.value);
  };

  const sortProducts = (option: string): productDataState[] => {
    switch (option) {
      case "hightolow":
        return [...productDataState].sort((a, b) => b.price - a.price);
      case "lowtohigh":
        return [...productDataState].sort((a, b) => a.price - b.price);
      default:
        return productDataState;
    }
  };
  // Sorting the products based on the selected option
  const sortedProducts: productDataState[] = sortProducts(sortingOption);

  //pagination for all products
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 4;
  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;
  const totalPages: number = Math.ceil(sortedProducts.length / itemsPerPage);
  const lastDisplayedIndex: number = Math.min(endIndex, sortedProducts.length);

  //pagination for category products
  const [catCurrentPage, setCatCurrentPage] = useState<number>(1);
  const catItemsPerPage: number = 4;
  const catStartIndex: number = (catCurrentPage - 1) * catItemsPerPage;
  const catEndIndex: number = catStartIndex + catItemsPerPage;
  const catLastDisplayedIndex: number = Math.min(
    catEndIndex,
    categoryData.length
  );

  // selectors for scrolling view
  const offersRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const selectCatRef = useRef<HTMLDivElement>(null);

  // functions for handling scroll view

  const handleShopNowClick = () => {
    if (offersRef.current) {
      offersRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClickBounce = () => {
    if (selectCatRef.current) {
      selectCatRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const handleHeartClick = (event: React.MouseEvent, productId: number) => {
    event.preventDefault();

    if (likedProducts.includes(productId)) {
      setLikedProducts(likedProducts.filter((id) => id !== productId));
    } else {
      setLikedProducts([...likedProducts, productId]);
    }
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
      `You've Added ${product.title.substring(
        0,
        55
      )}... successfully to your Cart!`,
      { variant: "success" }
    );
  };

  return (
    <>
      <div className="main">
        {/* -------------Data filter section-------------- */}

        {/*----------------- banner section ------------------*/}
        <div className="img mt-[23px] flex h-[22.225rem] gap-5 px-[70px] custom-banner">
          <div className="img-left ">
            <Carousel
              className="carousel"
              autoPlay={true}
              showArrows={true}
              swipeable={false}
              showThumbs={false}
              renderIndicator={(clickHandler, isSelected, index, label) => {
                if (isSelected) {
                  return (
                    <>
                      <div className="inline-flex ">
                        <li
                          className="dot-active  "
                          aria-label={`Selected: ${label} ${index + 1}`}
                          title={`Selected: ${label} ${index + 1}`}
                        />
                      </div>
                    </>
                  );
                }
                return (
                  <>
                    <div className="inline-flex">
                      <li
                        className="dot-inactive"
                        onClick={clickHandler}
                        onKeyDown={clickHandler}
                        value={index}
                        key={index}
                        role="button"
                        tabIndex={0}
                        title={`${label} ${index + 1}`}
                        aria-label={`${label} ${index + 1}`}
                      />
                    </div>
                  </>
                );
              }}
            >
              <div>
                <img
                  src={bannerOne}
                  className="h-full w-full rounded-lg shadow-lg"
                />
              </div>

              <div>
                <img
                  src={bannerTwo}
                  className="h-full w-full rounded-lg shadow-lg"
                />
              </div>
              <div>
                <img
                  src={bannerThree}
                  className="h-full w-full rounded-lg shadow-lg"
                />
              </div>
            </Carousel>
          </div>
          <div className="img-right overflow-hidden relative ">
            <img
              src={imgRight}
              className="h-full w-full rounded-lg zoom relative"
              alt=""
            />
            <div className="absolute top-1/3 right-1/2  flex items-center justify-center gap-[20px] flex-col custom-img-text">
              <p className="text-[#00addb] font-bold text-1xl uppercase  z-1">
                Armed pc gamer
              </p>
              <p className="text-white font-semibold">
                Choose your pc and play!
              </p>

              <button
                className="px-4 py-2 bg-[#00addb] font-bold text-[1rem] text-white rounded-md custom-btn"
                onClick={handleShopNowClick}
              >
                Shop now
              </button>
            </div>
          </div>
        </div>
        {/* -------------category filtered--------------- */}
        <div ref={selectCatRef}>
          <div className="mt-10">
            <div className="hidden sm:block bg-white mb-4 min-w-full px-[200px] py-1 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between mt-4">
                {catNav.map((item, i) => (
                  <div
                    className="flex flex-col  items-center group"
                    key={i}
                    onClick={() => handleCategoryClick(item.name)}
                  >
                    <div className="h-[100px] w-[100px]">
                      <img
                        draggable="false"
                        className={`h-full w-full rounded-full object-cover ${
                          selectedImage === item.icon
                            ? "bg-[#b7f90f88] rounded-full p-1"
                            : ""
                        }`}
                        src={item.icon}
                        alt={item.name}
                        onClick={() => handleImageClick(item.icon)}
                      />
                    </div>
                    <span className="text-sm text-gray-800 font-medium group-hover:text-primary-blue">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* -------------------category filtered ends------------------------------ */}
        {/* ----------------card section-------------------- */}

        <div>
          <div ref={offersRef} className="listing mt-10 text-center text-lg">
            <p className="uppercase text-2xl my-6 font-bold">Offers</p>

            <div className="products px-[70px]">
              <div>
                {/* -----------dropdown---------- */}
                <div className="flex justify-end">
                  <select
                    className="border rounded mb-2"
                    onChange={handleSortingOptionChange}
                  >
                    <option value="all">All</option>
                    <option value="hightolow">Price:high to low </option>
                    <option value="lowtohigh">Price:low to high</option>
                  </select>
                </div>
                {/* range slider for filter out product based on price */}

                {/* range slider ends */}
                <div className="grid grid-cols-4  gap-10  custom-card ">
                  {loading === "pending" ? (
                    <div className="col-span-4 ">
                      <Spinner />
                    </div>
                  ) : (
                    sortedProducts
                      .slice(startIndex, endIndex)
                      .map((product) => (
                        <>
                          <div className="w-full max-h-[700px] bg-white border border-gray-200 rounded-lg custom-inner  shadow-2xl">
                            <div className="grid grid-cols-3 cursor-pointer"   >
                              {/* <div className="p-2 flex justify-center image-hover relative"> */}
                              <div></div>
                              <div>
                                <img
                                  className="object-contain h-[170px] w-[200px] "
                                  src={product.image}
                                  alt="product image"
                                  onClick={() =>
                                    navigate(`productdetails/${product?.id}`)
                                  }
                                />
                                <div className="hover-icon"></div>{" "}
                              </div>
                              <div className="hover-icon">
                                <FontAwesomeIcon
                                  icon={faHeart}
                                  className={`absolute h-[27px] mt-4 cursor-pointer ${
                                    wishList.find(
                                      (item) => item.id === product.id
                                    )
                                      ? "text-red-500"
                                      : "text-gray-500"
                                  }`}
                                  onClick={() => handleWishlistToggle(product)}
                                />
                              </div>{" "}
                              {/* </div> */}
                            </div>
                            <div className="px-5 pb-5">
                              <a
                                onClick={() =>
                                  navigate(`productdetails/${product?.id}`)
                                }
                              >
                                {/* <Link to={`productdetails/${product?.id}`}> */}
                                <h5 className="text-xl font-semibold tracking-tight text-gray-900  truncate">
                                  {product.title}
                                </h5>
                                {/* </Link> */}
                              </a>
                              <div className="flex  justify-between mt-2.5 mb-5">
                                <div className="svg flex flex-row">
                                  {[...Array(5)].map((_, index) => (
                                    <svg
                                      key={index}
                                      className={`w-4 h-4 ${
                                        index < Math.floor(product.rating.rate)
                                          ? "text-yellow-300"
                                          : "text-gray-300"
                                      } mr-1`}
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="currentColor"
                                      viewBox="0 0 22 20"
                                    >
                                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                  ))}
                                </div>

                                <div className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded   ml-3">
                                  {product.rating.rate}
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <span className="text-1xl font-bold text-gray-900 product-text">
                                  ₹{product.price}
                                </span>

                                <button
                                  className="transition text-xs px-2 py-2 ease-in duration-200 uppercase rounded-md hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none button-text"
                                  onClick={() => handleAddToCart(product)}
                                >
                                  Add to cart
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      ))
                  )}
                </div>

                <div className="flex flex-col items-center mt-10 mb-10">
                  <span className="text-sm text-gray-700 ">
                    Showing{" "}
                    <span className="font-semibold text-gray-900 ">
                      {startIndex + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold text-gray-900 ">
                      {lastDisplayedIndex}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900 ">
                      {sortedProducts.length}
                    </span>{" "}
                    Entries
                  </span>
                  <div className="inline-flex mt-2 xs:mt-0">
                    <button
                      className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <svg
                        className="w-3.5 h-3.5 mr-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 5H1m0 0 4 4M1 5l4-4"
                        />
                      </svg>
                      Prev
                    </button>
                    <button
                      className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={endIndex >= sortedProducts.length}
                    >
                      Next
                      <svg
                        className="w-3.5 h-3.5 ml-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------categories section------------------------- */}

        <div ref={categoryRef} className="listing mt-10 text-center text-lg">
          <p className="uppercase text-2xl my-6 font-bold">Browse categories</p>

          <div className="products px-[70px]">
            <div>
              <div className="grid grid-cols-4  gap-10  custom-card ">
                {loading === "pending" ? (<div className="col-span-4 ">
                      <Spinner />
                    </div>):(  categoryData
                  .slice(catStartIndex, catEndIndex)
                  .map((product) => (
                    <>
                      <div className="w-full max-h-[700px] bg-white border border-gray-200 rounded-lg custom-inner  shadow-2xl">
                        <div className="grid grid-cols-3">
                          {/* <div className="p-2 flex justify-center image-hover relative"> */}
                          <div></div>
                          <div>
                            <img
                              onClick={() =>navigate(`productdetails/${product?.id}`)}
                              className="object-contain h-[170px] w-[200px] cursor-pointer"
                              src={product.image}
                              alt="product image"
                              
                            />
                            <div className="hover-icon"></div>{" "}
                          </div>
                          <div className="hover-icon">
                            <FontAwesomeIcon
                              icon={faHeart}
                              className={`absolute h-[27px] mt-4 cursor-pointer ${
                                wishList.find((item) => item.id === product.id)
                                  ? "text-red-500"
                                  : "text-gray-500"
                              }`}
                              onClick={() => handleWishlistToggle(product)}
                            />
                          </div>{" "}
                          {/* </div> */}
                        </div>
                        <div className="px-5 pb-5">
                          <a  onClick={() =>navigate(`productdetails/${product?.id}`)} className="cursor-pointer">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900  truncate">
                              {product.title}
                            </h5>
                          </a>

                          <div className="flex  justify-between mt-2.5 mb-5">
                            <div className="svg flex flex-row">
                              {[...Array(5)].map((_, index) => (
                                <svg
                                  key={index}
                                  className={`w-4 h-4 ${
                                    index < Math.floor(product.rating.rate)
                                      ? "text-yellow-300"
                                      : "text-gray-300"
                                  } mr-1`}
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 22 20"
                                >
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                              ))}
                            </div>

                            <div className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded   ml-3">
                              {product.rating.rate}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-1xl font-bold text-gray-900 product-text">
                              ₹{product.price}
                            </span>

                            <button
                              className="transition text-xs px-2 py-2 ease-in duration-200 uppercase rounded-md hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none button-text"
                              onClick={() => handleAddToCart(product)}
                            >
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )))}
              
              </div>

              <div className="flex flex-col items-center mt-10 mb-10">
                <span className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-semibold text-gray-900">
                    {catStartIndex + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-gray-900">
                    {catLastDisplayedIndex}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900">
                    {categoryData.length}
                  </span>{" "}
                  Entries
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 "
                    onClick={() => setCatCurrentPage(catCurrentPage - 1)}
                    disabled={catCurrentPage === 1}
                  >
                    <svg
                      className="w-3.5 h-3.5 mr-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 5H1m0 0 4 4M1 5l4-4"
                      />
                    </svg>
                    Prev
                  </button>
                  <button
                    className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900"
                    onClick={() => setCatCurrentPage(catCurrentPage + 1)}
                    disabled={catEndIndex >= categoryData.length}
                  >
                    Next
                    <svg
                      className="w-3.5 h-3.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="animate-bounce w-10 h-10 ...">
              <img
                onClick={handleClickBounce}
                width="50"
                height="50"
                src="https://img.icons8.com/ios/50/login-rounded-up.png"
                alt="login-rounded-up"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
