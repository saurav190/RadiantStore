import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchData } from "../../redux/slices/search/searchSlice";
import { useAppDispatch } from "../../redux/store";

const Searchbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    navigate("/search");
    setSearch(event.target.value);
  };

  useEffect(() => {
    dispatch(searchData(search));
  }, [search])

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(searchData(search));
    navigate("/search");

  };
  return (
    <form className="w-full sm:w-9/12 px-1 sm:px-4 py-1.5 flex justify-between items-center shadow-md bg-white rounded-sm overflow-hidden">
      <input
        value={search}
        onChange={handleSearchChange}
        className="text-sm flex-1 outline-none border-none placeholder-gray-500"
        type="text"
        placeholder="Search for products, brands and more"
      />
      <button
        onClick={handleSearch}
        type="submit"
        className="text-primary-blue"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};

export default Searchbar;
