import { MovieScreening } from "./MovieScreening";

export class MovieTicket {
  private seatRow: number;
  private seatNr: number;
  private isPremium: boolean;
  private movieScreening: MovieScreening;

  constructor(seatRow: number, seatNr: number, isPremium: boolean, movieScreening: MovieScreening) {
    this.movieScreening = movieScreening;
    this.seatRow = seatRow;
    this.seatNr = seatNr;
    this.isPremium = isPremium;
  }

  isPremiumTicket(): boolean {
    return this.isPremium;
  }

  getPrice() {
    // get the price per seat from the movie screening
    return this.movieScreening.getPricePerSeat();
  }

  // get the date and time of the movie screening
  getDateAndTime(): Date {
    return this.movieScreening.getDateAndTime();
  }

  getSeatRow(): number {
    return this.seatRow;
  }

  getSeatNr(): number {
    return this.seatNr;
  }

  getMovieTitle(): string {
    return this.movieScreening.getMovie().toString();
  }

  toString(): string {
    return "Seat " + this.seatRow + "-" + this.seatNr + " (" + this.movieScreening.toString() + ")";
  }
}
