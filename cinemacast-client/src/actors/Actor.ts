export class Actor {
  id: number | undefined;
  name = "";
  imdbID = "";
  nationality = "";
  gender = "";
  awards: string[] = [];

  get isNew(): boolean {
    return this.id === undefined;
  }

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.name) this.name = initializer.name;
    if (initializer.imdbID) this.imdbID = initializer.imdbID;
    if (initializer.nationality) this.nationality = initializer.nationality;
    if (initializer.gender) this.gender = initializer.gender;
    if (initializer.awards) this.awards = initializer.awards;
  }
}