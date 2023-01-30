import { Movie } from "./Movie";

export class MovieScreening {
  private dateAndTime: Date;
  private pricePerSeat: number;
  private movie: Movie;

  constructor(dateAndTime: Date, pricePerSeat: number, movie: Movie) {
    this.dateAndTime = dateAndTime;
    this.pricePerSeat = pricePerSeat;
    this.movie = movie;
  }

  getPricePerSeat(): number {
    return this.pricePerSeat;
  }

  getDateAndTime(): Date {
    return this.dateAndTime;
  }

  toString(): String {
    return this.movie.toString() + " " + this.dateAndTime.toLocaleString() + " €" + this.pricePerSeat;
  }
}
