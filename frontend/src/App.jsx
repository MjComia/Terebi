import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MoviePage } from "./pages/MoviePage";
import { TvShowsPage } from "./pages/TvShowsPage";
import { NewAndPopularPage } from "./pages/NewAndPopularPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/tv" element={<TvShowsPage />} />
        <Route path="/new-and-popular" element={<NewAndPopularPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
