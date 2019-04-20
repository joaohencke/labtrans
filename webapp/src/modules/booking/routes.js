import BookingList from "./containers/BookingList";
import BookingPut from "./containers/BookingPut";

export default [
  {
    path: "/bookings",
    exact: true,
    component: BookingList,
    name: "booking-list"
  },
  {
    path: "/bookings/create",
    exact: true,
    component: BookingPut,
    name: "booking-put.create"
  },
  {
    path: "/bookings/:id/edit",
    exact: true,
    component: BookingPut,
    name: "booking-put.edit"
  }
];
