"use strict";
exports.__esModule = true;
exports.Movie = void 0;
var Movie = /** @class */ (function () {
    function Movie(title) {
        this.screenings = [];
        this.title = title;
    }
    Movie.prototype.addScreening = function (screening) {
        this.screenings.push(screening);
    };
    Movie.prototype.toString = function () {
        return this.title + " (" + this.screenings.length + " screenings)";
    };
    return Movie;
}());
exports.Movie = Movie;
