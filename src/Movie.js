"use strict";
exports.__esModule = true;
exports.Movie = void 0;
var Movie = /** @class */ (function () {
    function Movie(title) {
        this.screenings = [];
        this.title = title;
        this.screenings = [];
    }
    Movie.prototype.addScreening = function (screening) {
        // add screening to moviescreenings
        this.screenings.push(screening);
    };
    Movie.prototype.toString = function () {
        return this.title;
    };
    return Movie;
}());
exports.Movie = Movie;
