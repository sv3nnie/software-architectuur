import { MovieScreening } from "./MovieScreening";

export class Movie {
  private title: string;
  private screenings: MovieScreening[] = [];

  constructor(title: string) {
    this.title = title;
    this.screenings = [];
  }

  addScreening(screening: MovieScreening): void {
    // add screening to moviescreenings
    this.screenings.push(screening);
  }

  toString() {
    return this.title;
  }
}
