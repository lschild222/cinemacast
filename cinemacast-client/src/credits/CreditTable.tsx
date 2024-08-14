import { Link } from "react-router-dom";
import { Movie } from "../movies/Movie";
import { Credit } from "./Credit";

interface CreditTableProps {
  movie: Movie;
  onRemove: (credit: Credit) => void;
}

function CreditTable({ movie, onRemove }: CreditTableProps) {
  return (
    <table className="table table-hover table-light w-50">
      <thead>
        <tr>
          <th>Actor</th>
          <th>Role</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {movie.credits?.map((credit) => (
          <tr key={credit.id}>
            <td>{credit.actor?.name}</td>
            <td>{credit.role}</td>
            <td className="d-flex gap-2">
              <Link to={`/movies/detail/${movie.id}/credit/edit/${credit.id}`}>edit</Link>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  onRemove(credit);
                }}
              >
                delete
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CreditTable;
