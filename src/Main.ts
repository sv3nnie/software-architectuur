import { Movie } from "./Movie";
import { MovieScreening } from "./MovieScreening";
import { MovieTicket } from "./MovieTicket";
import { Order } from "./Order";
import { TicketExportFormat } from "./TicketExportFormat";
import moment from "moment";

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
console.log(order.calculatePrice());
order.export(TicketExportFormat.PLAINTEXT);
