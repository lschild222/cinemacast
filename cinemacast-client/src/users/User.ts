export class User {
  id: number | undefined = undefined;
  username = "";
  password = "";
  firstName = "";
  lastName = "";

  get isNew(): boolean {
    return this.id === undefined;
  }

  get initials(): string {
    return  this.firstName.substring(0, 1) //+ this.lastName.substring(0, 1);
  }

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.username) this.username = initializer.username;
    if (initializer.password) this.password = initializer.password;
    if (initializer.firstName) this.firstName = initializer.firstName;
    if (initializer.lastName) this.lastName = initializer.lastName;
  }
}
