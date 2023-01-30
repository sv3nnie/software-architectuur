"use strict";
exports.__esModule = true;
exports.MovieTicket = void 0;
var MovieTicket = /** @class */ (function () {
    function MovieTicket(seatRow, seatNr, isPremium, movieScreening) {
        this.movieScreening = movieScreening;
        this.seatRow = seatRow;
        this.seatNr = seatNr;
        this.isPremium = isPremium;
    }
    MovieTicket.prototype.isPremiumTicket = function () {
        return this.isPremium;
    };
    MovieTicket.prototype.getPrice = function () {
        // get the price per seat from the movie screening
        return this.movieScreening.getPricePerSeat();
    };
    // get the date and time of the movie screening
    MovieTicket.prototype.getDateAndTime = function () {
        return this.movieScreening.getDateAndTime();
    };
    MovieTicket.prototype.toString = function () {
        return "Seat " + this.seatRow + "-" + this.seatNr + " (" + this.movieScreening.toString() + ")";
    };
    return MovieTicket;
}());
exports.MovieTicket = MovieTicket;
