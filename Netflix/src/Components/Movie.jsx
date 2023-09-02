/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoHeart } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/slices/favourite";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favourites.favourites);
  const isFavorite = favorites.find((mov) => mov.id === movie.id);

  const handleFavorite = () => {
    dispatch(toggleFavorite(movie));
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
      <img
        className="w-full h-[34rem] object-cover"
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="px-4 py-4">
        <h2 className="h-12 text-xl font-semibold text-white mb-2">
          {movie.title}
        </h2>
        <p className="text-gray-400 text-sm mb-2 h-20 overflow-hidden">
          {movie.overview}
        </p>
        <div className="flex justify-between h-14 ">
          <div>
            <div className="flex items-center mb-2">
              <span className="text-yellow-400 mr-1">&#9733;</span>
              <span className="text-white">{movie.vote_average}</span>
            </div>

            <p className="text-gray-400 text-sm">{movie.release_date}</p>
          </div>
          <IoHeart
            className={`text-xl w-10 h-20 ${
              isFavorite ? "text-red-500" : "text-gray-500"
            }`}
            onClick={handleFavorite}
          />
        </div>
      </div>
      <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded  mt-auto">
        <Link to={`/movie/${movie.id}`}>Watch Now</Link>
      </button>
    </div>
  );
};

export default MovieCard;
