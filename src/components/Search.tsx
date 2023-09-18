import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";

const Search: React.FC = () => {
  const navigate=useNavigate()
  const searchData = useSelector(
    (state: RootState) => state.search.searchResults
  );
  const handelProductClick:React.MouseEventHandler<HTMLDivElement> | undefined=(searchId)=>{
    navigate(`../productDetails/${searchId}`)
  }
  
  return (
    <>
      
        <div className="min-h-[44vh] cursor-pointer">
          <div className="px-10 grid grid-rows-1">

            {
            searchData.length > 0 ? (

            searchData.map((result, index) => (
              <div
                key={index}
                className="text-black font-bold flex rounded-lg shadow-2xl my-3 h-[50px] w-full "
                onClick={()=>handelProductClick(result.id)}
              >
                <div className="search-img flex items-center ml-5">
                  <img
                    src={result.image}
                    alt=""
                    className="h-[40px] w-[40px] rounded-full"
                  />
                </div>
                <div className="search-text flex items-center ml-5">
                  {result.title}
                </div>
              </div>
            ))
            ):(
<div className="text-black font-bold text-center mt-5">No search results found.</div>
            )}
          </div>
        </div>
      
    </>
  );
};

export default Search;
