import BookingList from './containers/BookingList';

export default [
  {
    path: '/bookings',
    exact: true,
    component: BookingList,
    name: 'booking-list',
  },
];
