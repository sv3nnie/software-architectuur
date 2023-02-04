import { expect } from "chai";
import { Movie } from "../src/Movie";
import { MovieScreening } from "../src/MovieScreening";
import { MovieTicket } from "../src/MovieTicket";
import { Order } from "../src/Order";
import { TicketExportFormat } from "../src/TicketExportFormat";
import moment from "moment";

describe("Second ticket price calculation", () => {
  it("Second ticket should be free any day of the week for students", () => {
    const movie = new Movie("The Matrix");
    const screening = new MovieScreening(new Date(), 10, movie);
    movie.addScreening(screening);
    const order = new Order(1, true);
    order.addSeatReservation(new MovieTicket(1, 1, false, screening));
    order.addSeatReservation(new MovieTicket(1, 2, false, screening));
    expect(order.calculatePrice()).to.equal(10);
  });

  describe("Second tickets should be free for non-students on mo-tu-we-th", () => {
    it("Second ticket should be free for non-students on a Monday", () => {
      const movie = new Movie("The Matrix");
      const screening = new MovieScreening(moment().day(1).toDate(), 10, movie);
      movie.addScreening(screening);
      const order = new Order(1, false);
      order.addSeatReservation(new MovieTicket(1, 1, false, screening));
      order.addSeatReservation(new MovieTicket(1, 2, false, screening));
      expect(order.calculatePrice()).to.equal(10);
    });
    it("Second ticket should be free for non-students on a Tuesday", () => {
      const movie = new Movie("The Matrix");
      const screening = new MovieScreening(moment().day(2).toDate(), 10, movie);
      movie.addScreening(screening);
      const order = new Order(1, false);
      order.addSeatReservation(new MovieTicket(1, 1, false, screening));
      order.addSeatReservation(new MovieTicket(1, 2, false, screening));
      expect(order.calculatePrice()).to.equal(10);
    });
    it("Second ticket should be free for non-students on a Wednesday", () => {
      const movie = new Movie("The Matrix");
      const screening = new MovieScreening(moment().day(3).toDate(), 10, movie);
      movie.addScreening(screening);
      const order = new Order(1, false);
      order.addSeatReservation(new MovieTicket(1, 1, false, screening));
      order.addSeatReservation(new MovieTicket(1, 2, false, screening));
      expect(order.calculatePrice()).to.equal(10);
    });
    it("Second ticket should be free for non-students on a Thursday", () => {
      const movie = new Movie("The Matrix");
      const screening = new MovieScreening(moment().day(4).toDate(), 10, movie);
      movie.addScreening(screening);
      const order = new Order(1, false);
      order.addSeatReservation(new MovieTicket(1, 1, false, screening));
      order.addSeatReservation(new MovieTicket(1, 2, false, screening));
      expect(order.calculatePrice()).to.equal(10);
    });
  });

  describe("Second tickets should be free on weekends for students", () => {
    it("Second ticket should be free on a Friday for students", () => {
      const movie = new Movie("The Matrix");
      const screening = new MovieScreening(moment().day(5).toDate(), 10, movie);
      movie.addScreening(screening);
      const order = new Order(1, true);
      order.addSeatReservation(new MovieTicket(1, 1, false, screening));
      order.addSeatReservation(new MovieTicket(1, 2, false, screening));
      expect(order.calculatePrice()).to.equal(10);
    });
    it("Second ticket should be free on a Saturday for students", () => {
      const movie = new Movie("The Matrix");
      const screening = new MovieScreening(moment().day(6).toDate(), 10, movie);
      movie.addScreening(screening);
      const order = new Order(1, true);
      order.addSeatReservation(new MovieTicket(1, 1, false, screening));
      order.addSeatReservation(new MovieTicket(1, 2, false, screening));
      expect(order.calculatePrice()).to.equal(10);
    });
    it("Second ticket should be free on a Sunday for students", () => {
      const movie = new Movie("The Matrix");
      const screening = new MovieScreening(moment().day(0).toDate(), 10, movie);
      movie.addScreening(screening);
      const order = new Order(1, true);
      order.addSeatReservation(new MovieTicket(1, 1, false, screening));
      order.addSeatReservation(new MovieTicket(1, 2, false, screening));
      expect(order.calculatePrice()).to.equal(10);
    });
    it("Second ticket should not be free on a Friday for non-students", () => {
      const movie = new Movie("The Matrix");
      const screening = new MovieScreening(moment().day(5).toDate(), 10, movie);
      movie.addScreening(screening);
      const order = new Order(1, false);
      order.addSeatReservation(new MovieTicket(1, 1, false, screening));
      order.addSeatReservation(new MovieTicket(1, 2, false, screening));
      expect(order.calculatePrice()).to.equal(20);
    });
    it("Second ticket should not be free on a Saturday for non-students", () => {
      const movie = new Movie("The Matrix");
      const screening = new MovieScreening(moment().day(6).toDate(), 10, movie);
      movie.addScreening(screening);
      const order = new Order(1, false);
      order.addSeatReservation(new MovieTicket(1, 1, false, screening));
      order.addSeatReservation(new MovieTicket(1, 2, false, screening));
      expect(order.calculatePrice()).to.equal(20);
    });
    it("Second ticket should not be free on a Sunday for non-students", () => {
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

describe("Discount price calulation", () => {
  describe("10% off of 6 or more tickets during weekend days", () => {
    it("Non-students should get a 10% discount on Friday", () => {
      const movie = new Movie("The Matrix");
      const screening = new MovieScreening(moment().day(5).toDate(), 10, movie);
      movie.addScreening(screening);
      const order = new Order(1, false);
      order.addSeatReservation(new MovieTicket(1, 1, false, screening));
      order.addSeatReservation(new MovieTicket(1, 2, false, screening));
      order.addSeatReservation(new MovieTicket(1, 3, false, screening));
      order.addSeatReservation(new MovieTicket(1, 4, false, screening));
      order.addSeatReservation(new MovieTicket(1, 5, false, screening));
      order.addSeatReservation(new MovieTicket(1, 6, false, screening));
      expect(order.calculatePrice()).to.equal(54);
    });
    it("Non-students should get a 10% discount on Saturday", () => {
      const movie = new Movie("The Matrix");
      const screening = new MovieScreening(moment().day(6).toDate(), 10, movie);
      movie.addScreening(screening);
      const order = new Order(1, false);
      order.addSeatReservation(new MovieTicket(1, 1, false, screening));
      order.addSeatReservation(new MovieTicket(1, 2, false, screening));
      order.addSeatReservation(new MovieTicket(1, 3, false, screening));
      order.addSeatReservation(new MovieTicket(1, 4, false, screening));
      order.addSeatReservation(new MovieTicket(1, 5, false, screening));
      order.addSeatReservation(new MovieTicket(1, 6, false, screening));
      expect(order.calculatePrice()).to.equal(54);
    });
    it("Non-students should get a 10% discount on Sunday", () => {
      const movie = new Movie("The Matrix");
      const screening = new MovieScreening(moment().day(0).toDate(), 10, movie);
      movie.addScreening(screening);
      const order = new Order(1, false);
      order.addSeatReservation(new MovieTicket(1, 1, false, screening));
      order.addSeatReservation(new MovieTicket(1, 2, false, screening));
      order.addSeatReservation(new MovieTicket(1, 3, false, screening));
      order.addSeatReservation(new MovieTicket(1, 4, false, screening));
      order.addSeatReservation(new MovieTicket(1, 5, false, screening));
      order.addSeatReservation(new MovieTicket(1, 6, false, screening));
      expect(order.calculatePrice()).to.equal(54);
    });
    it("Non-students should not get a 10% discount on Friday", () => {
      const movie = new Movie("The Matrix");
      const screening = new MovieScreening(moment().day(5).toDate(), 10, movie);
      movie.addScreening(screening);
      const order = new Order(1, false);
      order.addSeatReservation(new MovieTicket(1, 1, false, screening));
      order.addSeatReservation(new MovieTicket(1, 2, false, screening));
      order.addSeatReservation(new MovieTicket(1, 3, false, screening));
      order.addSeatReservation(new MovieTicket(1, 4, false, screening));
      order.addSeatReservation(new MovieTicket(1, 5, false, screening));
      expect(order.calculatePrice()).to.equal(50);
    });
    it("Non-students should not get a 10% discount on Saturday", () => {
      const movie = new Movie("The Matrix");
      const screening = new MovieScreening(moment().day(6).toDate(), 10, movie);
      movie.addScreening(screening);
      const order = new Order(1, false);
      order.addSeatReservation(new MovieTicket(1, 1, false, screening));
      order.addSeatReservation(new MovieTicket(1, 2, false, screening));
      order.addSeatReservation(new MovieTicket(1, 3, false, screening));
      order.addSeatReservation(new MovieTicket(1, 4, false, screening));
      order.addSeatReservation(new MovieTicket(1, 5, false, screening));
      expect(order.calculatePrice()).to.equal(50);
    });
    it("Non-students should not get a 10% discount on Sunday", () => {
      const movie = new Movie("The Matrix");
      const screening = new MovieScreening(moment().day(0).toDate(), 10, movie);
      movie.addScreening(screening);
      const order = new Order(1, false);
      order.addSeatReservation(new MovieTicket(1, 1, false, screening));
      order.addSeatReservation(new MovieTicket(1, 2, false, screening));
      order.addSeatReservation(new MovieTicket(1, 3, false, screening));
      order.addSeatReservation(new MovieTicket(1, 4, false, screening));
      order.addSeatReservation(new MovieTicket(1, 5, false, screening));
      expect(order.calculatePrice()).to.equal(50);
    });
  });
});
