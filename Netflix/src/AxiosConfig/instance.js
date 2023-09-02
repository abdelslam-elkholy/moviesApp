import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",

  params: {
    api_key: "b89dcbd1fb01845e9973076c8234c531",
  },
});

// axiosInstance.interceptors.response.use(
//   (response) => {
//     if (response.data && Array.isArray(response.data)) {
//       response.data.results.forEach((movie) => {
//         movie.favorite = false;
//       });
//     }
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
export default axiosInstance;
