import { MovieScreening } from "./MovieScreening";

export class Movie {
  private title: string;
  private screenings: MovieScreening[] = [];

  constructor(title: string) {
    this.title = title;
  }

  addScreening(screening: MovieScreening): void {
    this.screenings.push(screening);
  }

  toString() {
    return this.title + " (" + this.screenings.length + " screenings)";
  }
}
