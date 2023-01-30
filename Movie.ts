import { MovieScreening } from "./MovieScreening";

export class Movie {
  private title: String;

  constructor(title: String) {
    this.title = title;
  }

  addScreening(screening: MovieScreening): void {}

  toString() {
    return "";
  }
}
