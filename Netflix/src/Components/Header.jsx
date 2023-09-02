import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../AxiosConfig/instance";
import { IoHeart } from "react-icons/io5";
import { useSelector } from "react-redux";
import { languageContext } from "../context/languages";

function Header() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const { language, setLanguage } = useContext(languageContext);

  const navigate = useNavigate();
  const favourites = useSelector((state) => state.favourites.favourites);

  const primaryColor = "#6741d9";
  const primaryLightColor = "#7950f2";
  const redColor = "#fa5222";

  useEffect(() => {
    if (query) {
      axiosInstance
        .get("/search/movie", { params: { query: query } })
        .then((data) => {
          setSearchResults(data.data.results.slice(0, 10));
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
        });
    } else {
      setSearchResults([]);
    }
  }, [query]);

  const handleItemClick = (id) => {
    navigate(`/movie/${id}`);
    setQuery("");
  };

  return (
    <header
      className="flex justify-between items-center px-8 py-2 "
      style={{ backgroundColor: primaryColor }}
    >
      <div className="flex items-center space-x-2">
        <Link to={"/"}>
          {" "}
          <span className="text-6xl">🍿</span>
        </Link>
        <h1 className="text-3xl font-semibold" style={{ color: redColor }}>
          <Link to={"/"}> Netflix </Link>
        </h1>
      </div>
      <nav className="flex space-x-6"></nav>
      <div className="relative">
        <input
          style={{ backgroundColor: primaryLightColor }}
          className="bg-primary-light px-6 py-4 text-xl rounded-lg transition duration-300 w-96 text-text placeholder-text-dark focus:outline-none focus:shadow-md transform hover:translate-y-[-2px]"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          // onBlur={() => setShowDropdown(false)}
        />
        {showDropdown && searchResults && (
          <ul className="absolute left-0 mt-2 w-full bg-gray-600 border border-gray-700 rounded-lg shadow-lg">
            {searchResults.map((result) => (
              <li
                onClick={() => {
                  handleItemClick(result.id);
                }}
                key={result.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-700"
              >
                {/* <Link
                  className="text-gray-200 hover:text-white"
                  to={`/movie/${result.id}`}
                >
                  {result.title}
                </Link> */}
                <span className="text-gray-200 hover:text-white">
                  {result.title}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex items-center ">
        <span
          onClick={() =>
            language == "en" ? setLanguage("ar") : setLanguage("en")
          }
          className="text-4xl cursor-pointer mr-20"
        >
          {language == "en" ? "🇺🇸" : "🇪🇬"}
        </span>
        <IoHeart
          className={`text-xl  text-red-500 w-10 h-20`}
          onClick={() => navigate("/favourites")}
        />
        {favourites.length > 0 && (
          <span className="text-xl text-gray-50">{favourites.length}</span>
        )}
      </div>
    </header>
  );
}

export default Header;
