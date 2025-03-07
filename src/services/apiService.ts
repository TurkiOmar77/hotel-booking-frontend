export interface Room {
    id: string;
    number: string;
    type: string;
    status: string;
  }
  
  export interface Booking {
    id: string;
    userId: string;
    room: Room;
    checkIn: string;
    checkOut: string;
    status: string;
  }
  
  const API_URL_ROOMS = process.env.NEXT_PUBLIC_API_URL + "rooms/";
  const API_URL_BOOKINGS = process.env.NEXT_PUBLIC_API_URL + "booking/";
  const API_URL_BOOKINGS_CREATE = process.env.NEXT_PUBLIC_API_URL + "booking/create";
  
  export const getRooms = async (token: string): Promise<Room[]> => {
    const response = await fetch(API_URL_ROOMS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch rooms");
    }
    return response.json();
  };
  
  export const getBookings = async (token: string): Promise<Booking[]> => {
    const response = await fetch(API_URL_BOOKINGS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }
    return response.json();
  };
  
  export const createBooking = async (
    roomId: string,
    userId: string,
    checkIn: string,
    checkOut: string,
    token: string
  ): Promise<void> => {
    const response = await fetch(API_URL_BOOKINGS_CREATE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ roomId, userId, checkIn, checkOut })
    });
    if (!response.ok) {
      throw new Error("Booking failed");
    }
  };
  
  export const deleteBooking = async (bookingId: string, token: string): Promise<void> => {
    const response = await fetch(`${API_URL_BOOKINGS}${bookingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error("Cancellation failed");
    }
  };
  