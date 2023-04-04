import { csrfFetch } from "./csrf";
import { getAllSpots, getSpotById } from "./spots";

const CREATE = "bookings/CREATE";
const USER = "bookings/USER";
const SPOT = "bookings/SPOT";
const UPDATE = "bookings/UPDATE";
const DELETE = "bookings/DELETE";

const createBooking = (booking) => {
  return {
    type: CREATE,
    booking,
  };
};

const loadUserBooking = (bookings) => {
  return {
    type: USER,
    bookings,
  };
};

const loadSpotBooking = (bookings) => {
  return {
    type: SPOT,
    bookings,
  };
};

const updateBooking = (booking) => {
  return {
    type: UPDATE,
    booking,
  };
};

const deleteBooking = (bookingId) => {
  return {
    type: DELETE,
    bookingId,
  };
};

export const bookingCreate = (spotId, booking) => async (dispatch) => {
  const { method, headers, body } = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  };

  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, { method, headers, body });

  if (response.ok) {
    const booking = await response.json();
    dispatch(createBooking(booking));
  }
};

export const userBooking = () => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/current`);

  if (response.ok) {
    const bookings = await response.json();
    dispatch(loadUserBooking(bookings));
    return bookings;
  }
};

export const spotBooking = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

  if (response.ok) {
    const bookings = await response.json();
    dispatch(loadSpotBooking(bookings));
  }
};

export const bookingUpdate = (booking) => async (dispatch) => {
  const { method, headers, body } = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  };

  const response = await csrfFetch(`/api/bookings/${booking.id}`, { method, headers, body });

  if (response.ok) {
    const booking = await response.json();
    dispatch(updateBooking(booking));
    return booking;
  }
};

export const removeBooking = (bookingId) => async (dispatch) => {
  const { method, headers } = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  const response = await csrfFetch(`/api/bookings/${bookingId}`, { method, headers });

  if (response.ok) {
    const booking = await response.json();
    dispatch(deleteBooking(bookingId));
    return booking;
  }
};

const initialState = { spot: {}, user: {} };

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE:
      return {
        ...state,
        spot: { ...state.spot, [action.booking.id]: action.booking },
      };
    case USER:
      return {
        ...state,
        user: action.bookings.Bookings.reduce((acc, booking) => {
          acc[booking.id] = booking;
          return acc;
        }, {}),
      };
    case SPOT:
      return {
        ...state,
        spot: action.bookings.Bookings.reduce((acc, booking) => {
            acc[booking.id] = booking;
            return acc;
          }, {}),
        };
      case UPDATE:
        return {
          ...state,
          spot: { ...state.spot, [action.booking.id]: action.booking },
        };
      case DELETE:
        const { [action.bookingId]: deletedSpotBooking, ...remainingSpotBookings } = state.spot;
        const { [action.bookingId]: deletedUserBooking, ...remainingUserBookings } = state.user;
        return {
          spot: remainingSpotBookings,
          user: remainingUserBookings,
        };
      default:
        return state;
    }
    };

    export default bookingReducer;
