import { useEffect, useState } from "react";
import { movieAPI } from "./MovieAPI";
import { Movie } from "./Movie";
import toast from "react-hot-toast";
import MovieCard from "./MovieCard";

function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [busy, setBusy] = useState(false);

  async function loadMovies() {
    try {
      setBusy(true);
      const data = await movieAPI.list();
      setMovies(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    loadMovies();
  }, []);

  async function remove(movie: Movie) {
    if (confirm("Are you sure you want to delete this Movie?")) {
      if (movie.id) {
        await movieAPI.delete(movie.id);
        let updatedMovies = movies.filter((m) => m.id !== movie.id);
        setMovies(updatedMovies);
        toast.success("Successfully deleted.");
      }
    }
  }

  return (
    <>
      {busy && (
        <section className="d-flex justify-content-center align-items-center align-content-center vh-100">
          <div className=" spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </section>
      )}
      <section className="d-flex flex-wrap gap-4 list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onRemove={remove} />
        ))}
      </section>
    </>
  );
}

export default MovieList;
