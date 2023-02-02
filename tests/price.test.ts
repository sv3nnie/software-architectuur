import { expect } from "chai";
// import all required classes like order, ticket, etc.
import { Movie } from "../src/Movie";
import { MovieScreening } from "../src/MovieScreening";
import { MovieTicket } from "../src/MovieTicket";
import { Order } from "../src/Order";
import { TicketExportFormat } from "../src/TicketExportFormat";
import moment from "moment";

describe("Ticket price calculation", () => {
  // check if second ticket is free for students
  it("goeie title hier", () => {
    const movie = new Movie("The Matrix");
    const screening = new MovieScreening(new Date(), 10, movie);
    movie.addScreening(screening);
    const order = new Order(1, true);
    order.addSeatReservation(new MovieTicket(1, 1, false, screening));
    order.addSeatReservation(new MovieTicket(1, 2, false, screening));
    expect(order.calculatePrice()).to.equal(10);
  });
  // check if second ticket is NOT free for non-students on a saturday
  it("goeie title hier", () => {
    const movie = new Movie("The Matrix");
    const screening = new MovieScreening(moment().day(6).toDate(), 10, movie);
    movie.addScreening(screening);
    const order = new Order(1, false);
    order.addSeatReservation(new MovieTicket(1, 1, false, screening));
    order.addSeatReservation(new MovieTicket(1, 2, false, screening));
    expect(order.calculatePrice()).to.equal(20);
  });
  // check if second ticket is free for non-students on a monday
  it("goeie title hier", () => {
    const movie = new Movie("The Matrix");
    const screening = new MovieScreening(moment().day(1).toDate(), 10, movie);
    movie.addScreening(screening);
    const order = new Order(1, false);
    order.addSeatReservation(new MovieTicket(1, 1, false, screening));
    order.addSeatReservation(new MovieTicket(1, 2, false, screening));
    expect(order.calculatePrice()).to.equal(10);
  });
});
