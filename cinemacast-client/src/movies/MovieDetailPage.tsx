import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  Link,
  Route,
  Routes,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Movie } from "./Movie";
import { movieAPI } from "./MovieAPI";
import CreditTable from "../credits/CreditTable";
import { creditAPI } from "../credits/CreditAPI";
import { Credit } from "../credits/Credit";
import CreditCreatePage from "../credits/CreditCreatePage";
import CreditEditPage from "../credits/CreditEditPage";

function MovieDetailPage() {
  const { movieId: movieIdAsString } = useParams<{
    movieId: string;
  }>();
  let [searchParams, ] = useSearchParams();
  const movieId = Number(movieIdAsString);
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const [busy, setBusy] = useState(false);

  async function loadMovie() {
    try {
      if (!movieId) return;
      setBusy(true);
      const data = await movieAPI.findWithDetails(movieId);
      setMovie(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    loadMovie();
  }, [searchParams.get("lastUpdated")]);

  async function removeCredit(credit: Credit) {
    if (confirm("Are you sure you want to delete this Movie?")) {
      if (credit.id) {
        await creditAPI.delete(credit.id);
        toast.success("Successfully deleted.");
        let updatedCredits = movie?.credits?.filter((c) => c.id !== credit.id);
        if (movie) {
          setMovie({ ...movie, credits: updatedCredits } as Movie);
        }
      }
    }
  }

  if (!movie) return null;

  return (
    <>
      <nav className="d-flex justify-content-between pe-2">
        <h4>Movie</h4>
        <Link
          to={`/movies/edit/${movie.id}`}
          className="btn btn-outline-primary"
        >
          edit movie
        </Link>
      </nav>
      <hr />
      <>
        {busy && (
          <section className="d-flex justify-content-center align-items-center align-content-center vh-100">
            <div className=" spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </section>
        )}
        {movie && (
          <>
            <section className="card d-flex flex-row gap-5 p-4 w-100 bg-body-tertiary">
              <dl className="">
                <dt>Title</dt>
                <dd>{movie.title}</dd>
                <dt>Genre</dt>
                <dd>{movie.genre}</dd>
              </dl>
              <dl>
                <dt>Year</dt>
                <dd>{movie.year}</dd>
                <dt>Director</dt>
                <dd>{movie.director}</dd>
              </dl>
              <dl>
                <dt>Rating</dt>
                <dd>{movie.rating}</dd>
                <dt>Budget</dt>
                <dd>
                  ${movie.budgetInMillions}{" "}
                  {movie.budgetInMillions && "million"}{" "}
                </dd>
              </dl>
            </section>
            <section className="card p-4 mt-4 w-100">
              <header className="d-flex justify-content-between">
                <h5>Cast</h5>

                <Link
                  className="btn btn-outline-primary"
                  to={`/movies/detail/${movie.id}/credit/create`}
                >
                  + add credit
                </Link>
              </header>
              <CreditTable movie={movie} onRemove={removeCredit} />
              <Routes>
                <Route path="credit/create" element={<CreditCreatePage />} />
                <Route
                  path="credit/edit/:creditId"
                  element={<CreditEditPage />}
                />
              </Routes>
            </section>
          </>
        )}
      </>
    </>
  );
}

export default MovieDetailPage;
