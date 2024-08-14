import { creditAPI } from "../credits/CreditAPI";
import { BASE_URL, checkStatus, delay, parseJSON } from "../utility/fetchUtilities";
import { Movie } from "./Movie";

const url = `${BASE_URL}/movies`;

function replacer(key: string, value: any) {
  if (key === "credits") return undefined;
  return value;
}

export const movieAPI = {
  list(): Promise<Movie[]> {
    return fetch(url).then(delay(400)).then(checkStatus).then(parseJSON);
  },

  find(id: number): Promise<Movie> {
    return fetch(`${url}/${id}`).then(checkStatus).then(parseJSON);
  },

  async findWithDetails(id: number): Promise<Movie> {
    // let url = `${url}`;
    // url = `${url}/${id}`;
    // if (queryString) {
    //   url = `${url}?${queryString}`;

    let movie = await movieAPI.find(id);
    if (movie.id) {
      movie.credits = await creditAPI.listByMovie(movie?.id);
    }
    return Promise.resolve(movie);
  },

  post(movie: Movie) {
    return fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify(movie, replacer),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(checkStatus)
      .then(parseJSON);
  },

  put(movie: Movie) {
    return fetch(`${url}/${movie.id}`, {
      method: "PUT",
      body: JSON.stringify(movie, replacer),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(checkStatus);
    // .then(parseJSON);
  },

  delete(id: number) {
    return fetch(`${url}/${id}`, { method: "DELETE" }).then(checkStatus);
  },
};
