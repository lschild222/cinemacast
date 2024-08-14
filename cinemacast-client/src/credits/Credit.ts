import { Actor } from "../actors/Actor";

export class Credit {
  id: number | undefined = undefined;
  movieId: number | undefined = undefined;
  actorId: number | undefined = undefined;
  role = "";
  actor: Actor | undefined;

  get isNew(): boolean {
    return this.id === undefined;
  }

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.movieId) this.movieId = initializer.movieId;
    if (initializer.actorId) this.actorId = initializer.actorId;
    if (initializer.role) this.role = initializer.role;
    if (initializer.actor) this.actor = initializer.actor;
  }
}
