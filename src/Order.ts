import { MovieTicket } from "./MovieTicket";
import { TicketExportFormat } from "./TicketExportFormat";
import * as fs from "fs";

export class Order {
  private orderNr: number;
  private isStudentOrder: boolean;
  private tickets = new Array<MovieTicket>();

  constructor(orderNr: number, isStudentOrder: boolean) {
    this.orderNr = orderNr;
    this.isStudentOrder = isStudentOrder;
    this.tickets = [];
  }

  getOrderNr(): number {
    return this.orderNr;
  }

  addSeatReservation(ticket: MovieTicket): void {
    this.tickets.push(ticket);
  }

  calculatePrice(): number {
    let totalPrice = 0;
    // loop over all tickets and calculate the total price
    for (let ticket of this.tickets) {
      let ticketPrice = ticket.getPrice();
      // if ticket is premium and it is a student order, add 2 to price, otherwise add 3
      ticketPrice += ticket.isPremiumTicket()
        ? this.isStudentOrder
          ? 2
          : 3
        : 0;
      // every second ticket is free for students
      if (this.isStudentOrder && this.tickets.indexOf(ticket) % 2 == 1)
        continue;
      // if it is monday, tuesday, wednesday or thursday, every second ticket for non-students is free
      if (
        !this.isStudentOrder &&
        this.tickets.indexOf(ticket) % 2 == 1 &&
        ticket.getDateAndTime().getDay() >= 1 &&
        ticket.getDateAndTime().getDay() <= 4
      )
        continue;
      // if it is friday, saturday or sunday, give a 10% discount if a non-student has equal or more than 6 tickets
      if (
        !this.isStudentOrder &&
        this.tickets.length >= 6 &&
        (ticket.getDateAndTime().getDay() >= 5 ||
          ticket.getDateAndTime().getDay() == 0)
      ) {
        totalPrice += ticketPrice * 0.9;
        continue;
      }
      totalPrice += ticketPrice;
    }
    return totalPrice;
  }

  toString(): string {
    let result =
      "Order " +
      this.orderNr +
      " (" +
      (this.isStudentOrder ? "student" : "regular") +
      ")\n";
    for (let ticket of this.tickets) {
      result += ticket.toString() + "\n";
    }
    result += "Total price: " + this.calculatePrice() + " euros";
    return result;
  }

  export(exportFormat: TicketExportFormat): void {
    switch (exportFormat) {
      case TicketExportFormat.PLAINTEXT:
        console.log("Exporting order in plain text format");
        // export the order in plain text format
        fs.writeFileSync("order.txt", this.toString());
        break;
      case TicketExportFormat.JSON:
        console.log("Exporting order in JSON format");
        // export the order in JSON format and remove any circular references
        let json = JSON.stringify(this, (key, value) => {
          if (key == "tickets") {
            return value.map((ticket: MovieTicket) => {
              return {
                movie: ticket.getMovieTitle(),
                dateAndTime: ticket.getDateAndTime(),
                row: ticket.getSeatRow(),
                seat: ticket.getSeatNr(),
                isPremiumTicket: ticket.isPremiumTicket(),
                price: ticket.getPrice(),
              };
            });
          }
          return value;
        });
        // add total price to bottom of JSON
        json =
          json.substring(0, json.length - 1) +
          ', "totalPrice": ' +
          this.calculatePrice() +
          "}";
        fs.writeFileSync("order.json", json);
        break;
    }
  }
}
