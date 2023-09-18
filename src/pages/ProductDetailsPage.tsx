import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,faStar  ,faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import {fetchProductDetail} from '../redux/slices/productDetails/productDetailsSlice';
import { Link, useParams } from 'react-router-dom';
import { addItemToCart } from '../redux/slices/cart/cartSlice';
import { CartItem } from '../utils/types';
import { useSnackbar } from 'notistack';
import Carousel from '../components/Carousel';
import   UserReview, { UserReviewData } from '../components/UserReview';
import { IncrementItem,DecrementItem } from '../redux/slices/productDetails/productDetailsSlice';
import Spinner from '../components/common/Spinner';
import { removeFromWishlist,addToWishlist } from '../redux/slices/wishList/wishlistSlice';
import '../assets/css/productDetails.css'
const ProductDetailsPage: React.FC = () => {

  const user: any = useSelector((state: RootState) => state.userAuth.login);
  const [reviews, setReviews] = useState<UserReviewData[]>([
    {
      username: "User1",
      rating: 4,
      comment: "Great product! Highly recommended.",
    },
    {
      username: "User2",
      rating: 5,
      comment: "Excellent quality and fast shipping.",
    },
    
  ])
  const [userComment, setUserComment] = useState<string>("");

  const [rating, setRating] = useState<number>(0);
  

  const handleStarClick = (starIndex:number) => {
    setRating(starIndex + 1);
   
  };
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

  const dispatch = useDispatch<AppDispatch>();
  const product  = useSelector((state:RootState)=>state.productDetails.product)
  const { enqueueSnackbar } = useSnackbar();
  const counter = useSelector((state:RootState)=>state.productDetails.counter)
  const {productId}=useParams()
  const productIdAsNumber: number = productId ? parseInt(productId as unknown as string, 10) : 0;

  useEffect(() => {
    dispatch(fetchProductDetail(productIdAsNumber))
  }, [dispatch,productIdAsNumber])
  
  
  if (!product) {
    return <Spinner/>;
  }
  //print star logic
  const fullStars = Math.floor(product.rating.rate);
  const hasHalfStar = product.rating.rate - fullStars >= 0.5;

  const fullStarIcons = Array.from({ length: fullStars }).map((_, index) => (
    <FontAwesomeIcon
      key={index}
      icon={faStar}
      className="w-4 h-4 text-[#385A64]"
    />
  ));
  const halfStarIcon = hasHalfStar && (
    <FontAwesomeIcon
      key="half-star"
      icon={faStarHalf}
      className="w-4 h-4 text-[#385A64]"
    />
  );

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      category: product.category,
      description: product.description,
      image: product.image,
      title: product.title,
      price: product.price,
      rating: product.rating,
      quantity: counter, 
      totalPrice: product.price * counter,

    };
    dispatch(addItemToCart(cartItem));
    enqueueSnackbar("Product Added To the Cart", { variant: "success" });
  };

  const handleSaveReview = () => {
   const data={
    username:user?.name,
    rating:rating,
    comment:userComment,
   }
    setReviews([...reviews, data]);
    setUserComment(""); 
    setRating(0)
  };
  
  return (
        <div className=" bg-[#f5f7f8] flex justify-center items-center">
            <div className=' mx-auto my-5'>
                <div className="container p-2 py-8 mx-auto bg-white rounded-lg cursor-auto">
                    <div className=" mx-auto flex flex-wrap justify-center">
                      <div className='imagecontainer lg:w-1/4 w-full md:w-1/2  lg:h-1/2 h-64 flex justify-end items-end sm:justify-center sm:align-middle sm:w-4/6'> 
                             
                        <img alt="ecommerce" className="imageFit object-fit object-center rounded cursor: auto sm:w-2/3" src={product.image}  height={100}/>
                      
                      </div>
                      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 cursor: auto" >
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 cursor-auto">{product.title}</h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                            {fullStarIcons}
                            {halfStarIcon}
                              <span className="text-gray-600 ml-3 my-2">{product.rating.count} Reviews</span>
                            </span>
                        </div>
                        <div className="flex rounded-lg bg-white px-3 py-2 text-[#007aff] shadow w-24">
                          <span className="text-2xl ">&#8377;</span>
                          <span className="text-2xl font-semibold leading-7">{product.price}</span>
                        </div>
                        <p className="leading-relaxed">{product.description}</p>
                        <div className='my-3'>
                          <b>Categories: </b>
                          <span><Link to={`/${product.category}`} className="text-zinc-500">{product.category}</Link>,
                            </span>
                        </div>
                        <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex gap-1 items-center">
                              <span
                                onClick={()=>dispatch(DecrementItem())}
                                className="w-7 h-7 text-3xl font-light bg-gray-50 rounded-full border flex items-center justify-center cursor-pointer"
                              >
                                <p>-</p>
                              </span>
                              <input
                                className="w-11 border outline-none text-center rounded-sm py-0.5 text-gray-700 font-medium text-sm qtyInput"
                                value={counter}
                                disabled
                              />
                              <span
                                onClick={()=>dispatch(IncrementItem())}
                                className="w-7 h-7 text-xl font-light bg-gray-50 rounded-full border flex items-center justify-center cursor-pointer"
                              >
                                +
                              </span>
                            </div>
                            <button className='bg-[#385A64] w-full sm:w-1/3 mx-2 sm:mx-6 my-4 py-3 font-medium text-white shadow hover:shadow-lg rounded-lg flex items-center justify-center'>
                              <FontAwesomeIcon
                                icon={faHeart}
                                onClick={()=>handleWishlistToggle(product)}
                                className={`w-8 h-8 cursor-pointer ${
                                  wishList.find((item) => item.id === product.id)
                                    ? "text-red-500"
                                    : "text-white"
                                } transition duration-300 ease-in-out `}
                               /><p className='pl-2'>wishlist</p>
                            </button>
                            <button className={`${
                                counter < 1
                                  ? "bg-gray-200 cursor-not-allowed"
                                  : "bg-[#385A64]"
                              } w-full sm:w-1/3 mx-2 sm:mx-6 my-4 py-3 font-medium text-white shadow hover:shadow-lg rounded-lg`} onClick={handleAddToCart} disabled={counter < 1 ? true : false}>Add to cart</button>
                                        
                        </div>
                        </div>
                      </div>
                    </div>
                    <div className="container mt-16 mx-auto">
                      <h3 className="text-gray-600 text-2xl font-semibold my-3 px-3">RELATED PRODUCTS</h3>
                      <Carousel categoryName={product.category} relatedProductId={product.id}/>
                    </div>
                    <div>
                      <div className="container mx-auto py-8  ">
                        <h3 className="text-gray-600 text-2xl font-semibold my-3 px-3">User Reviews</h3>
                        <div className="grid gap-4">
                          {reviews.map((review, index) => (
                            <UserReview
                              key={index}
                              username={review.username}
                              rating={review.rating}
                              comment={review.comment}
                            />
                          ))}
                        </div>
                        <div className='my-2 mt-4'>
                          <h2 className='px-3 py-1 text-2xl font-semibold '>Write your Review</h2>
                          <textarea
                          name="userReview"
                          rows={2}
                          className="border-4 rounded-lg w-full  px-3 py-2"
                          placeholder="Write your review"
                          value={userComment}
                          onChange={(e) => setUserComment(e.target.value)}
                        />
                        <div className='my-3'>
                          <p className='text-xl font-bold py-2'>How would you rate it?</p>
                            {[...Array(5)].map((_, index) => (
                              <FontAwesomeIcon
                                key={index}
                                icon={faStar}
                                className={`cursor-pointer ${
                                  index < rating ? 'text-[#385A64]' : 'text-gray-400'
                                }`}
                                onClick={() => handleStarClick(index)}
                              />
                            ))}
                        </div>
                          
                        <button className={`
                          ${
                            user
                              ? "bg-[#385A64]"
                              : "bg-gray-200 cursor-not-allowed"
                          } 
                        mt-2 bg-blue-500 text-white px-4 py-2  hover:shadow-lg rounded-sm`} onClick={handleSaveReview}  disabled={user  ? false : true}>
                          Add Review
                        </button>
                        </div>
                      </div>
                    </div>
                </div>
            </div>    
  )
}

export default ProductDetailsPage;