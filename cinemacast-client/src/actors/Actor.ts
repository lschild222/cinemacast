export class Actor {
  id: number | undefined;
  name = "";
  imdbID = "";

  get isNew(): boolean {
    return this.id === undefined;
  }

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.id) this.name = initializer.name;
    if (initializer.id) this.imdbID = initializer.imdbID;
  }
}


