"use strict";
exports.__esModule = true;
exports.Order = void 0;
var TicketExportFormat_1 = require("./TicketExportFormat");
var fs = require("fs");
var Order = /** @class */ (function () {
    function Order(orderNr, isStudentOrder) {
        this.tickets = new Array();
        this.orderNr = orderNr;
        this.isStudentOrder = isStudentOrder;
        this.tickets = [];
    }
    Order.prototype.getOrderNr = function () {
        return this.orderNr;
    };
    Order.prototype.addSeatReservation = function (ticket) {
        this.tickets.push(ticket);
    };
    Order.prototype.calculatePrice = function () {
        var totalPrice = 0;
        // loop over all tickets and calculate the total price
        for (var _i = 0, _a = this.tickets; _i < _a.length; _i++) {
            var ticket = _a[_i];
            var ticketPrice = ticket.getPrice();
            // if ticket is premium and it is a student order, add 2 to price, otherwise add 3
            ticketPrice += ticket.isPremiumTicket() ? (this.isStudentOrder ? 2 : 3) : 0;
            // every second ticket is free for students
            if (this.isStudentOrder && this.tickets.indexOf(ticket) % 2 == 1) {
                continue;
            }
            // if it is monday, tuesday, wednesday or thursday, every second ticket for non-students is free
            if (!this.isStudentOrder && this.tickets.indexOf(ticket) % 2 == 1 && ticket.getDateAndTime().getDay() >= 1 && ticket.getDateAndTime().getDay() <= 4) {
                continue;
            }
            // if it is friday, saturday or sunday, give a 10% discount if a non-student has equal or more than 6 tickets
            if (!this.isStudentOrder && this.tickets.length >= 6 && ticket.getDateAndTime().getDay() >= 5 && ticket.getDateAndTime().getDay() <= 7) {
                totalPrice += ticketPrice * 0.9;
                continue;
            }
            totalPrice += ticketPrice;
        }
        return totalPrice;
    };
    Order.prototype.toString = function () {
        var result = "Order " + this.orderNr + " (" + (this.isStudentOrder ? "student" : "regular") + ")\n";
        for (var _i = 0, _a = this.tickets; _i < _a.length; _i++) {
            var ticket = _a[_i];
            result += ticket.toString() + "\n";
        }
        result += "Total price: " + this.calculatePrice() + " euros";
        return result;
    };
    Order.prototype["export"] = function (exportFormat) {
        switch (exportFormat) {
            case TicketExportFormat_1.TicketExportFormat.PLAINTEXT:
                console.log("Exporting order in plain text format");
                // export the order in plain text format
                fs.writeFileSync("order.txt", this.toString());
                break;
            case TicketExportFormat_1.TicketExportFormat.JSON:
                console.log("Exporting order in JSON format");
                // export the order in JSON format and remove any circular references
                var json = JSON.stringify(this, function (key, value) {
                    if (key == "tickets") {
                        return value.map(function (ticket) {
                            return {
                                movieTitle: ticket.getMovieTitle(),
                                dateAndTime: ticket.getDateAndTime(),
                                row: ticket.getSeatRow(),
                                seat: ticket.getSeatNr(),
                                isPremiumTicket: ticket.isPremiumTicket(),
                                price: ticket.getPrice()
                            };
                        });
                    }
                    return value;
                });
                // add total price to bottom of JSON
                json = json.substring(0, json.length - 1) + ', "totalPrice": ' + this.calculatePrice() + "}";
                fs.writeFileSync("order.json", json);
                break;
        }
    };
    return Order;
}());
exports.Order = Order;
