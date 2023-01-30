class Order {
  private orderNr: Number;
  private isStudentOrder: Boolean;
  private ticket: MovieTicket;

  constructor(orderNr: Number, isStudentOrder: Boolean) {
    this.orderNr = orderNr;
    this.isStudentOrder = isStudentOrder;
  }

  getOrderNr(): Number {
    return this.orderNr;
  }

  addSeatReservation(ticket: MovieTicket): void {
    this.ticket = ticket;
  }

  calculatePrice(): Number {
    return this.ticket.getPrice();
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
