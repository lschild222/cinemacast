import { BASE_URL, checkStatus, parseJSON } from "../utility/fetchUtilities";
import { User } from "./User";

const url = `${BASE_URL}/users`;

export const userAPI = {
  findByAccount(username: string, password: string): Promise<User> {
    return (
      fetch(`${url}?username=${username}&password=${password}`)
        .then(checkStatus)
        .then(parseJSON)
        //delete the next three lineswhen using PRS API because it will only return one user not an array with one user
        .then((users) => {
          return users[0] ?? undefined;
        })
    );
  },
};
