import { expect } from "chai";
import { Movie } from "../src/Movie";
import { MovieScreening } from "../src/MovieScreening";
import { MovieTicket } from "../src/MovieTicket";
import { Order } from "../src/Order";
import { TicketExportFormat } from "../src/TicketExportFormat";
import moment from "moment";

describe("UC 1 - Second ticket price calculation", () => {
  it("TC 100 - Second ticket should be free any day of the week for students", () => {
    const movie = new Movie("The Matrix");
    const screening = new MovieScreening(new Date(), 10, movie);
    movie.addScreening(screening);
    const order = new Order(1, true);
    order.addSeatReservation(new MovieTicket(1, 1, false, screening));
    order.addSeatReservation(new MovieTicket(1, 2, false, screening));
    expect(order.calculatePrice()).to.equal(10);
  });

  describe("Second tickets should be free for non-students on mo-tu-we-th", () => {
    it("TC 101 - Second ticket should be free for non-students on a Monday", () => {
      const movie = new Movie("The Matrix");
      const screening = new MovieScreening(moment().day(1).toDate(), 10, movie);
      movie.addScreening(screening);
      const order = new Order(1, false);
      order.addSeatReservation(new MovieTicket(1, 1, false, screening));
      order.addSeatReservation(new MovieTicket(1, 2, false, screening));
      expect(order.calculatePrice()).to.equal(10);
    });
    it("TC 102 - Second ticket should be free for non-students on a Tuesday", () => {
      const movie = new Movie("The Matrix");
      const screening = new MovieScreening(moment().day(2).toDate(), 10, movie);
      movie.addScreening(screening);
      const order = new Order(1, false);
      order.addSeatReservation(new MovieTicket(1, 1, false, screening));
      order.addSeatReservation(new MovieTicket(1, 2, false, screening));
      expect(order.calculatePrice()).to.equal(10);
    });
    it("TC 103 - Second ticket should be free for non-students on a Wednesday", () => {
      const movie = new Movie("The Matrix");
      const screening = new MovieScreening(moment().day(3).toDate(), 10, movie);
      movie.addScreening(screening);
      const order = new Order(1, false);
      order.addSeatReservation(new MovieTicket(1, 1, false, screening));
      order.addSeatReservation(new MovieTicket(1, 2, false, screening));
      expect(order.calculatePrice()).to.equal(10);
    });
    it("TC 104 - Second ticket should be free for non-students on a Thursday", () => {
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
    it("TC 105 - Second ticket should not be free on a Friday for non-students", () => {
      const movie = new Movie("The Matrix");
      const screening = new MovieScreening(moment().day(5).toDate(), 10, movie);
      movie.addScreening(screening);
      const order = new Order(1, false);
      order.addSeatReservation(new MovieTicket(1, 1, false, screening));
      order.addSeatReservation(new MovieTicket(1, 2, false, screening));
      expect(order.calculatePrice()).to.equal(20);
    });
    it("TC 106 - Second ticket should not be free on a Saturday for non-students", () => {
      const movie = new Movie("The Matrix");
      const screening = new MovieScreening(moment().day(6).toDate(), 10, movie);
      movie.addScreening(screening);
      const order = new Order(1, false);
      order.addSeatReservation(new MovieTicket(1, 1, false, screening));
      order.addSeatReservation(new MovieTicket(1, 2, false, screening));
      expect(order.calculatePrice()).to.equal(20);
    });
    it("TC 107 - Second ticket should not be free on a Sunday for non-students", () => {
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

describe("UC 2 - Discount price calulation", () => {
  describe("10% off of 6 or more tickets during weekend days", () => {
    it("TC 200 - Non-students should get a 10% discount on Friday", () => {
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
    it("TC 201 - Non-students should get a 10% discount on Saturday", () => {
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
    it("TC 202 - Non-students should get a 10% discount on Sunday", () => {
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
    it("TC 203 - Non-students should not get a 10% discount on Friday", () => {
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
    it("TC 204 - Non-students should not get a 10% discount on Saturday", () => {
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
    it("TC 205 - Non-students should not get a 10% discount on Sunday", () => {
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

  describe("UC 3 - Premium ticket price calculation", () => {
    describe("Student premium ticket prices", () => {
      it("TC 300 - Ticket prices should be 2 euros more per ticket than non-premium ones", () => {
        const movie = new Movie("The Matrix");
        const screening = new MovieScreening(new Date(), 10, movie);
        movie.addScreening(screening);
        const order = new Order(1, true);
        order.addSeatReservation(new MovieTicket(1, 1, true, screening));
        order.addSeatReservation(new MovieTicket(1, 2, true, screening));
        expect(order.calculatePrice()).to.equal(12);
      });

      it("TC 301 - Ticket prices should be 2 euros more than usual and should give the 10% discount on Friday", () => {
        const movie = new Movie("The Matrix");
        const screening = new MovieScreening(moment().day(5).toDate(), 10, movie);
        movie.addScreening(screening);
        const order = new Order(1, true);
        order.addSeatReservation(new MovieTicket(1, 1, true, screening));
        order.addSeatReservation(new MovieTicket(1, 2, true, screening));
        order.addSeatReservation(new MovieTicket(1, 3, true, screening));
        order.addSeatReservation(new MovieTicket(1, 4, true, screening));
        order.addSeatReservation(new MovieTicket(1, 5, true, screening));
        order.addSeatReservation(new MovieTicket(1, 6, true, screening));
        expect(order.calculatePrice()).to.equal(36);
      });
      it("TC 302 - Ticket prices should be 2 euros more than usual and should give the 10% discount on Saturday", () => {
        const movie = new Movie("The Matrix");
        const screening = new MovieScreening(moment().day(6).toDate(), 10, movie);
        movie.addScreening(screening);
        const order = new Order(1, true);
        order.addSeatReservation(new MovieTicket(1, 1, true, screening));
        order.addSeatReservation(new MovieTicket(1, 2, true, screening));
        order.addSeatReservation(new MovieTicket(1, 3, true, screening));
        order.addSeatReservation(new MovieTicket(1, 4, true, screening));
        order.addSeatReservation(new MovieTicket(1, 5, true, screening));
        order.addSeatReservation(new MovieTicket(1, 6, true, screening));
        expect(order.calculatePrice()).to.equal(36);
      });
      it("TC 303 - Ticket prices should be 2 euros more than usual and should give the 10% discount on Sunday", () => {
        const movie = new Movie("The Matrix");
        const screening = new MovieScreening(moment().day(0).toDate(), 10, movie);
        movie.addScreening(screening);
        const order = new Order(1, true);
        order.addSeatReservation(new MovieTicket(1, 1, true, screening));
        order.addSeatReservation(new MovieTicket(1, 2, true, screening));
        order.addSeatReservation(new MovieTicket(1, 3, true, screening));
        order.addSeatReservation(new MovieTicket(1, 4, true, screening));
        order.addSeatReservation(new MovieTicket(1, 5, true, screening));
        order.addSeatReservation(new MovieTicket(1, 6, true, screening));
        expect(order.calculatePrice()).to.equal(36);
      });
    });
    describe("Non-student premium ticket prices", () => {
      it("TC 304 - Ticketprices should be 3 more euros per ticket than normal ones", () => {
        const movie = new Movie("The Matrix");
        const screening = new MovieScreening(moment().day(0).toDate(), 10, movie);
        movie.addScreening(screening);
        const order = new Order(1, false);
        order.addSeatReservation(new MovieTicket(1, 1, true, screening));
        order.addSeatReservation(new MovieTicket(1, 2, true, screening));
        expect(order.calculatePrice()).to.equal(26);
      });
      it("TC 305 - Ticket prices should be 3 euros more than usual and should give the 10% discount on Friday", () => {
        const movie = new Movie("The Matrix");
        const screening = new MovieScreening(moment().day(5).toDate(), 10, movie);
        movie.addScreening(screening);
        const order = new Order(1, false);
        order.addSeatReservation(new MovieTicket(1, 1, true, screening));
        order.addSeatReservation(new MovieTicket(1, 2, true, screening));
        order.addSeatReservation(new MovieTicket(1, 3, true, screening));
        order.addSeatReservation(new MovieTicket(1, 4, true, screening));
        order.addSeatReservation(new MovieTicket(1, 5, true, screening));
        order.addSeatReservation(new MovieTicket(1, 6, true, screening));
        expect(order.calculatePrice()).to.equal(70.2);
      });
      it("TC 306 - Ticket prices should be 3 euros more than usual and should give the 10% discount on Saturday", () => {
        const movie = new Movie("The Matrix");
        const screening = new MovieScreening(moment().day(6).toDate(), 10, movie);
        movie.addScreening(screening);
        const order = new Order(1, false);
        order.addSeatReservation(new MovieTicket(1, 1, true, screening));
        order.addSeatReservation(new MovieTicket(1, 2, true, screening));
        order.addSeatReservation(new MovieTicket(1, 3, true, screening));
        order.addSeatReservation(new MovieTicket(1, 4, true, screening));
        order.addSeatReservation(new MovieTicket(1, 5, true, screening));
        order.addSeatReservation(new MovieTicket(1, 6, true, screening));
        expect(order.calculatePrice()).to.equal(70.2);
      });
      it("TC 307 - Ticket prices should be 3 euros more than usual and should give the 10% discount on Sunday", () => {
        const movie = new Movie("The Matrix");
        const screening = new MovieScreening(moment().day(0).toDate(), 10, movie);
        movie.addScreening(screening);
        const order = new Order(1, false);
        order.addSeatReservation(new MovieTicket(1, 1, true, screening));
        order.addSeatReservation(new MovieTicket(1, 2, true, screening));
        order.addSeatReservation(new MovieTicket(1, 3, true, screening));
        order.addSeatReservation(new MovieTicket(1, 4, true, screening));
        order.addSeatReservation(new MovieTicket(1, 5, true, screening));
        order.addSeatReservation(new MovieTicket(1, 6, true, screening));
        expect(order.calculatePrice()).to.equal(70.2);
      });
    });
  });
});
