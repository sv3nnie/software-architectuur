import { Movie } from "./Movie";

export class MovieScreening {
  private dateAndTime: Date;
  private pricePerSeat: number;

  constructor(dateAndTime: Date, pricePerSeat: number, movie: Movie) {
    this.dateAndTime = dateAndTime;
    this.pricePerSeat = pricePerSeat;
  }

  getPricePerSeat(): number {
    return this.pricePerSeat;
  }

  getDateAndTime(): Date {
    return this.dateAndTime;
  }

  toString(): String {
    return this.dateAndTime.toLocaleDateString() + " " + this.pricePerSeat + " euros";
  }
}
