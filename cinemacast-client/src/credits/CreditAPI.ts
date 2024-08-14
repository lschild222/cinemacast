import { BASE_URL, checkStatus, delay, parseJSON } from "../utility/fetchUtilities";
import { Credit } from "./Credit";

let url = `${BASE_URL}/credits`;

function replacer(key: string, value: any) {
  if (key === "actor") return undefined;
  return value;
}

export const creditAPI = {
  list(): Promise<Credit[]> {
    return fetch(url).then(delay(400)).then(checkStatus).then(parseJSON);
  },

  listByMovie(movieId: number): Promise<Credit[]> {
    let currentUrl = `${BASE_URL}/movies/${movieId}/credits?_expand=actor`;
    return fetch(currentUrl).then(delay(400)).then(checkStatus).then(parseJSON);
  },

  find(id: number): Promise<Credit> {
    return fetch(`${url}/${id}`).then(checkStatus).then(parseJSON);
  },

  post(credit: Credit) {
    return fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify(credit, replacer),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(checkStatus)
      .then(parseJSON);
  },

  put(credit: Credit) {
    return fetch(`${url}/${credit.id}`, {
      method: "PUT",
      body: JSON.stringify(credit, replacer),
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
