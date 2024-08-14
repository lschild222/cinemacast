import { BASE_URL, checkStatus, delay, parseJSON } from "../utility/fetchUtilities";
import { Actor } from "./Actor";

let url = `${BASE_URL}/actors`;


export const actorAPI = {
  list(): Promise<Actor[]> {
    return fetch(`${url}?_sort=name&_order=asc`).then(checkStatus).then(parseJSON);
  },

  find(id: number): Promise<Actor> {
    return fetch(`${url}/${id}`).then(checkStatus).then(parseJSON);
  },

  post(actor: Actor) {
    return fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify(actor),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(checkStatus)
      .then(parseJSON);
  },

  put(actor: Actor) {
    return fetch(`${url}/${actor.id}`, {
      method: "PUT",
      body: JSON.stringify(actor),
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
