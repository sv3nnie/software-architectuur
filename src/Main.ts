import { Movie } from "./Movie";
import { MovieScreening } from "./MovieScreening";
import { MovieTicket } from "./MovieTicket";
import { Order } from "./Order";
import { TicketExportFormat } from "./TicketExportFormat";

// let movie = new Movie("The Matrix");

// let screening = new MovieScreening(new Date(), 10, new Movie("The Matrix"));
// movie.addScreening(screening);

let order = new Order(1, false);
// order.addSeatReservation(new MovieTicket(1, 1, false, screening));
// order.addSeatReservation(new MovieTicket(1, 2, false, screening));
// order.addSeatReservation(new MovieTicket(1, 3, true, screening));
// order.addSeatReservation(new MovieTicket(1, 4, true, screening));
// order.addSeatReservation(new MovieTicket(1, 5, true, screening));

let movie = new Movie("The Matrix 2");
let screening = new MovieScreening(new Date(), 10, movie);
movie.addScreening(screening);

order.addSeatReservation(new MovieTicket(1, 1, false, screening));
order.addSeatReservation(new MovieTicket(1, 2, false, screening));
order.addSeatReservation(new MovieTicket(1, 3, true, screening));
order.addSeatReservation(new MovieTicket(1, 4, true, screening));
order.addSeatReservation(new MovieTicket(1, 5, true, screening));

console.log(order.calculatePrice());
order.export(TicketExportFormat.JSON);
