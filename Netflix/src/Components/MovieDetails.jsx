import React, { useEffect, useState } from "react";
import axiosInstance from "../AxiosConfig/instance";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const { id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance
      .get(`/movie/${id}`)
      .then((res) => {
        setMovie(res.data);
        console.log(res.data);
      })
      .catch(() => navigate(-1));
  }, [id]);

  const renderStars = () => {
    const rating = Math.round(movie.vote_average / 2);
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i <= rating ? "text-yellow-400" : "text-gray-300"}
        />
      );
    }

    return stars;
  };

  return (
    <div className="bg-gray-800 min-h-screen flex justify-center items-center">
      <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg flex">
        <div className="flex-none">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} Poster`}
            className="w-96 h-auto rounded-lg shadow-md"
          />
        </div>

        <div className="ml-8">
          <h1 className="text-4xl font-semibold mb-2">{movie.title}</h1>
          {movie.belongs_to_collection && (
            <div className="flex items-center mb-2">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.belongs_to_collection.backdrop_path}`}
                alt={`${movie.belongs_to_collection.name} Collection`}
                className="w-20 h-auto rounded-lg"
              />
              <span className="text-gray-400 ml-2">
                Collection: {movie.belongs_to_collection.name}
              </span>
            </div>
          )}
          {movie.tagline && (
            <p className="text-gray-400 text-lg mb-4">{movie.tagline}</p>
          )}
          <p className="text-gray-300 text-xl leading-relaxed mb-6">
            {movie.overview}
          </p>
          <div className="flex items-center mb-4">
            <span className="text-gray-400 mr-2">Release Date:</span>
            <span>{movie.release_date}</span>
          </div>
          {movie.genres && movie.genres.length > 0 && (
            <div className="flex items-center mb-4">
              <span className="text-gray-400 mr-2">Genres:</span>
              <span>{movie.genres.map((genre) => genre.name).join(", ")}</span>
            </div>
          )}
          <div className="flex items-center mb-4">
            <span className="text-gray-400 mr-2">Runtime:</span>
            <span>{movie.runtime} minutes</span>
          </div>
          {movie.budget && (
            <div className="flex items-center mb-4">
              <span className="text-gray-400 mr-2">Budget:</span>
              <span>${movie.budget.toLocaleString()}</span>
            </div>
          )}
          <div className="flex items-center mb-4">
            <span className="text-gray-400 mr-2">Popularity:</span>
            <span>
              {movie.popularity ? movie.popularity.toFixed(2) : "N/A"}
            </span>
          </div>
          {movie.revenue && (
            <div className="flex items-center mb-4">
              <span className="text-gray-400 mr-2">Revenue:</span>
              <span>${movie.revenue.toLocaleString()}</span>
            </div>
          )}
          {movie.status && (
            <div className="flex items-center mb-4">
              <span className="text-gray-400 mr-2">Status:</span>
              <span>{movie.status}</span>
            </div>
          )}
          {movie.spoken_languages && movie.spoken_languages.length > 0 && (
            <div className="flex items-center mb-4">
              <span className="text-gray-400 mr-2">Spoken Languages:</span>
              <span>
                {movie.spoken_languages.map((lang) => lang.name).join(", ")}
              </span>
            </div>
          )}
          {movie.production_companies &&
            movie.production_companies.length > 0 && (
              <div className="flex items-center mb-4">
                <span className="text-gray-400 mr-2">
                  Production Companies:
                </span>
                <div className="flex items-center">
                  {movie.production_companies.map((company) => (
                    <img
                      key={company.id}
                      src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                      alt={`${company.name} Logo`}
                      className="w-10 h-10 mr-2"
                    />
                  ))}
                </div>
              </div>
            )}
          <div className="flex items-center mb-2">
            <span className="text-gray-400 mr-2">Rating:</span>
            <span className="flex">{renderStars()}</span>
          </div>
          <div className="mt-8">
            <a
              href={movie.homepage}
              className="text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Movie Homepage
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
