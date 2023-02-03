import { expect } from "chai";
import { Movie } from "../src/Movie";
import { MovieScreening } from "../src/MovieScreening";
import { MovieTicket } from "../src/MovieTicket";
import { Order } from "../src/Order";
import { TicketExportFormat } from "../src/TicketExportFormat";
import moment from "moment";

describe("Ticket price calculation", () => {
  it("Second ticket should be free", () => {
    const movie = new Movie("The Matrix");
    const screening = new MovieScreening(new Date(), 10, movie);
    movie.addScreening(screening);
    const order = new Order(1, true);
    order.addSeatReservation(new MovieTicket(1, 1, false, screening));
    order.addSeatReservation(new MovieTicket(1, 2, false, screening));
    expect(order.calculatePrice()).to.equal(10);
  });

  it("Second ticket should be free for non-students on a monday", () => {
    const movie = new Movie("The Matrix");
    const screening = new MovieScreening(moment().day(1).toDate(), 10, movie);
    movie.addScreening(screening);
    const order = new Order(1, false);
    order.addSeatReservation(new MovieTicket(1, 1, false, screening));
    order.addSeatReservation(new MovieTicket(1, 2, false, screening));
    expect(order.calculatePrice()).to.equal(10);
  });

  describe("Second tickets should be free on weekends", () => {
    it("Second ticket should be free on a friday for students", () => {
      const movie = new Movie("The Matrix");
      const screening = new MovieScreening(moment().day(5).toDate(), 10, movie);
      movie.addScreening(screening);
      const order = new Order(1, true);
      order.addSeatReservation(new MovieTicket(1, 1, false, screening));
      order.addSeatReservation(new MovieTicket(1, 2, false, screening));
      expect(order.calculatePrice()).to.equal(10);
    });
    it("Second ticket should be free on a saturday for students", () => {
      const movie = new Movie("The Matrix");
      const screening = new MovieScreening(moment().day(6).toDate(), 10, movie);
      movie.addScreening(screening);
      const order = new Order(1, true);
      order.addSeatReservation(new MovieTicket(1, 1, false, screening));
      order.addSeatReservation(new MovieTicket(1, 2, false, screening));
      expect(order.calculatePrice()).to.equal(10);
    });
    it("Second ticket should be free on a sunday for students", () => {
      const movie = new Movie("The Matrix");
      const screening = new MovieScreening(moment().day(0).toDate(), 10, movie);
      movie.addScreening(screening);
      const order = new Order(1, true);
      order.addSeatReservation(new MovieTicket(1, 1, false, screening));
      order.addSeatReservation(new MovieTicket(1, 2, false, screening));
      expect(order.calculatePrice()).to.equal(10);
    });
    it("Second ticket should not be free on a friday for non-students", () => {
      const movie = new Movie("The Matrix");
      const screening = new MovieScreening(moment().day(5).toDate(), 10, movie);
      movie.addScreening(screening);
      const order = new Order(1, false);
      order.addSeatReservation(new MovieTicket(1, 1, false, screening));
      order.addSeatReservation(new MovieTicket(1, 2, false, screening));
      expect(order.calculatePrice()).to.equal(20);
    });
    it("Second ticket should not be free on a saturday for non-students", () => {
      const movie = new Movie("The Matrix");
      const screening = new MovieScreening(moment().day(6).toDate(), 10, movie);
      movie.addScreening(screening);
      const order = new Order(1, false);
      order.addSeatReservation(new MovieTicket(1, 1, false, screening));
      order.addSeatReservation(new MovieTicket(1, 2, false, screening));
      expect(order.calculatePrice()).to.equal(20);
    });
    it("Second ticket should not be free on a sunday for non-students", () => {
      const movie = new Movie("The Matrix");
      const screening = new MovieScreening(moment().day(0).toDate(), 10, movie);
      movie.addScreening(screening);
      const order = new Order(1, false);
      order.addSeatReservation(new MovieTicket(1, 1, false, screening));
      order.addSeatReservation(new MovieTicket(1, 2, false, screening));
      expect(order.calculatePrice()).to.equal(20);
    });
  });
});
