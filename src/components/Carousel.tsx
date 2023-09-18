import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from 'axios';
import {  useNavigate  } from 'react-router-dom';
import { CartItem } from '../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { addItemToCart } from '../redux/slices/cart/cartSlice';
import { useSnackbar } from 'notistack';
import { addToWishlist,removeFromWishlist } from '../redux/slices/wishList/wishlistSlice';
interface RelatedProductsProps {
  categoryName: string;
  relatedProductId:number;
}
  
const Carousel: React.FC<RelatedProductsProps> = ({ categoryName ,relatedProductId}) => {
  const [relatedProducts, setRelatedProducts] = useState<CartItem[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate=useNavigate()


  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/category/${categoryName}`);
        setRelatedProducts(response.data);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchRelatedProducts();
  }, [categoryName]);
  
  const wishList = useSelector((state: RootState) => state.wishList);

  const handleWishlistToggle = (product:CartItem) => {
    const isProductInWishlist = wishList.find((item) => item.id === product.id);
  
    if (isProductInWishlist) {
      // If the product is already in the wishlist, remove it
      dispatch(removeFromWishlist(product));
    } else {
      // If the product is not in the wishlist, add it
      dispatch(addToWishlist(product));
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
    localStorage.setItem('cartItem', JSON.stringify(cartItem));
    enqueueSnackbar("Product Added To the Cart", { variant: "success" });
  };
  const relatedProductsabc=relatedProducts.filter((item)=>item.id !== relatedProductId)
 
  const handelReplaceUrl=(productId:number)=>{
      // history.push(`${productId}`)
      navigate(`../productDetails/${productId}`, { replace: true })
      
  }
  return (
    <>
    <div className="products px-[70px]">
            <div className='grid grid-cols-4 gap-10'></div>
            
            <div className="grid grid-cols-4  gap-10  custom-card ">
                {relatedProductsabc.map((product) => (
                        <div key={product.id} className="md:w-full max-h-[700px] bg-white border border-gray-200 rounded-lg custom-inner  shadow-2xl hover:shadow-lg w-screen">
                          <div className="grid grid-cols-3">
                            <div>
                            </div>
                            <div className=''>
                              <img
                                className="object-contain h-[170px] w-[200px] cursor-pointer"
                                src={product.image}
                                alt="product data"
                                onClick={()=>handelReplaceUrl(product.id)}
                              />
                            </div>
                            <div className="hover-icon text-center">
                              <FontAwesomeIcon
                                icon={faHeart}
                                className={`absolute h-[27px] mt-4 cursor-pointer ${
                                  wishList.find((item) => item.id === product.id)
                                    ? "text-red-500"
                                    : "text-gray-500"
                                } `}
                                onClick={()=>handleWishlistToggle(product)}
                              />
                            </div>{" "}
                          </div>
                          <div className="px-5 pb-5">
                            <div  onClick={()=>handelReplaceUrl(product.id)} className='cursor-pointer'>
                              <h5 className="text-xl font-semibold tracking-tight text-gray-900  truncate">
                                {product.title}
                              </h5>
                            </div>

                            <div className="flex  justify-between mt-2.5 mb-5">
                              <div className="svg flex flex-row">
                                {[...Array(5)].map((_, index) => (
                                  <svg
                                    key={index}
                                    className={`w-4 h-4 ${
                                      index < Math.floor(product.rating.rate)
                                        ? "text-[#385A64]"
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
                              &#8377;{product.rating.rate}
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
                    
                    ))}
                    </div>
              
          </div>
    </>
  );
}

export default Carousel;
