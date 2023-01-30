import { MovieTicket } from "./MovieTicket";
import { TicketExportFormat } from "./TicketExportFormat";

export class Order {
  private orderNr: Number;
  private isStudentOrder: Boolean;
  private ticket: MovieTicket;

  constructor(orderNr: Number, isStudentOrder: Boolean) {
    this.orderNr = orderNr;
    this.isStudentOrder = isStudentOrder;
  }

  getOrderNr(): Number {
    return 0;
  }

  addSeatReservation(ticket: MovieTicket): void {
    this.ticket = ticket;
  }

  calculatePrice(): Number {
    return 0;
  }

  export(exportFormat: TicketExportFormat): void {
    switch (exportFormat) {
      case TicketExportFormat.PLAINTEXT:
        console.log("Exporting order in plain text format");
        break;
      case TicketExportFormat.JSON:
        console.log("Exporting order in JSON format");
        break;
    }
  }
}
