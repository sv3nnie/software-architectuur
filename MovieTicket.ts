class MovieTicket {
  private rowNr: Number;
  private seatNr: Number;
  private isPremium: Boolean;

  constructor(
    rowNr: Number,
    seatNr: Number,
    isPremium: Boolean,
    movieScreening: MovieScreening
  ) {
    this.rowNr = rowNr;
    this.seatNr = seatNr;
    this.isPremium = isPremium;
  }

  isPremiumTicket(): Boolean {
    if (this.isPremium) {
      return true;
    } else {
      return false;
    }
  }

  getPrice() {
    return 0;
  }

  toString(): String {
    return "MovieTicket";
  }
}
