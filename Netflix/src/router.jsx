import { createBrowserRouter } from "react-router-dom";
import MovieList from "./Components/MovieList";
import AppLayout from "./Components/AppLayout";
import NotFound from "./Components/NotFound";
import MovieDetails from "./Components/MovieDetails";
import Favourites from "./Components/Favourites";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <MovieList /> },
      { path: "/movies", element: <MovieList /> },
      { path: "/movie/:id", element: <MovieDetails /> },
      { path: "/favourites", element: <Favourites /> },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

export default router;
