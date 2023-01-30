import { Movie } from "./Movie";
import { MovieScreening } from "./MovieScreening";
import { MovieTicket } from "./MovieTicket";
import { Order } from "./Order";
import { TicketExportFormat } from "./TicketExportFormat";

let movie = new Movie("The Matrix");
let screening = new MovieScreening(new Date(), 10, new Movie("The Matrix"));
movie.addScreening(screening);
let order = new Order(1, false);
order.addSeatReservation(new MovieTicket(1, 1, false, screening));
order.addSeatReservation(new MovieTicket(1, 2, false, screening));
order.addSeatReservation(new MovieTicket(1, 3, false, screening));
order.addSeatReservation(new MovieTicket(1, 4, false, screening));
order.addSeatReservation(new MovieTicket(1, 5, false, screening));
console.log(order.calculatePrice());
order.export(TicketExportFormat.JSON);
