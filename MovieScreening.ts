class MovieScreening {
  private dateAndTime: Date;
  private pricePerSeat: Number;

  constructor(dateAndTime: Date, pricePerSeat: Number, movie: Movie) {
    this.dateAndTime = dateAndTime;
    this.pricePerSeat = pricePerSeat;
  }

  getPricePerSeat(): Number {
    return 0;
  }

  toString(): String {
    return "";
  }
}
