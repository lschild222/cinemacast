import { Link } from "react-router-dom";
import ActorList from "./ActorList";

function ActorsPage() {
  return (
    <>
      <header className="d-flex justify-content-between">
        <h4>Actors</h4>
        <Link
          to={"/actors/create"}
          role="button"
          className="btn btn-outline-secondary"
        >
          + Add Actor
        </Link>
      </header>

      <hr />
      <ActorList />
    </>
  );
}

export default ActorsPage;