import MovieForm from "./MovieForm";

function MovieCreatePage() {
  return (
    <>
      <nav className="d-flex justify-content-between">
        <h4>New Movie</h4>
      </nav>
      <hr />
      <MovieForm />
    </>
  );
}

export default MovieCreatePage;
