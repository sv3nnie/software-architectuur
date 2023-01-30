"use strict";
exports.__esModule = true;
exports.MovieScreening = void 0;
var MovieScreening = /** @class */ (function () {
    function MovieScreening(dateAndTime, pricePerSeat, movie) {
        this.dateAndTime = dateAndTime;
        this.pricePerSeat = pricePerSeat;
        this.movie = movie;
    }
    MovieScreening.prototype.getPricePerSeat = function () {
        return this.pricePerSeat;
    };
    MovieScreening.prototype.getDateAndTime = function () {
        return this.dateAndTime;
    };
    MovieScreening.prototype.toString = function () {
        return this.movie.toString() + " " + this.dateAndTime.toLocaleString() + " €" + this.pricePerSeat;
    };
    return MovieScreening;
}());
exports.MovieScreening = MovieScreening;
