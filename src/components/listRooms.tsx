"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  getRooms,
  getBookings,
  createBooking,
  deleteBooking,
  Room,
  Booking
} from "../services/apiService";

const statusColors: Record<string, string> = {
  Available: "text-green-600 bg-green-100",
  Booked: "text-red-600 bg-red-100",
  Maintenance: "text-yellow-600 bg-yellow-100"
};

const ListRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const currentUserId = typeof window !== "undefined" ? localStorage.getItem("userId")?.trim() : "";

  const fetchData = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const [roomsData, bookingsData] = await Promise.all([getRooms(token), getBookings(token)]);
      setRooms(roomsData);
      setBookings(bookingsData);
      setError("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      setError("You must be logged in to view rooms");
      router.push("/login");
      return;
    }
    fetchData();
  }, [token, router, fetchData]);

  const handleBooking = async (roomId: string) => {
    if (!token || !currentUserId) {
      alert("User not authenticated");
      return;
    }
    try {
      const checkIn = "2025-03-01";
      const checkOut = "2025-03-05";
      await createBooking(roomId, currentUserId, checkIn, checkOut, token);
      alert(`Booking Successfully`);
      fetchData();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.message || "Error booking room. Please try again.");
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!token) {
      alert("User not authenticated");
      return;
    }
    try {
      await deleteBooking(bookingId, token);
      alert("Booking canceled successfully");
      fetchData();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.message || "Error canceling booking. Please try again.");
    }
  };

  const availableRooms = rooms.filter(room => room.status === "AVAILABLE");
  const bookedRooms = bookings.filter(booking => booking.status !== "CANCELLED");

  return (
    <div className="container mx-auto mt-6 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Room List</h2>
        {loading && <p className="text-center text-gray-500">Loading data...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <>
            <section>
              <h3 className="text-lg font-semibold mt-4 text-green-700">Available Rooms</h3>
              <table className="w-full border-collapse border rounded-lg overflow-hidden shadow-md">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="p-3 text-left">Room Number</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {availableRooms.length > 0 ? (
                    availableRooms.map(room => (
                      <tr key={room.id} className="border-t hover:bg-gray-50 transition">
                        <td className="p-3">{room.number}</td>
                        <td className="p-3">{room.type}</td>
                        <td className={`p-3 rounded-lg text-sm font-medium ${statusColors[room.status] || "text-gray-600 bg-gray-100"}`}>
                          {room.status}
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => handleBooking(room.id)}
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg"
                          >
                            Book
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-gray-600">
                        No available rooms
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section>
            <section>
              <h3 className="text-lg font-semibold mt-6 text-red-700">Booked Rooms</h3>
              <table className="w-full border-collapse border rounded-lg overflow-hidden shadow-md">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="p-3 text-left">Room Number</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookedRooms.length > 0 ? (
                    bookedRooms.map(booking => (
                      <tr key={booking.id} className="border-t hover:bg-gray-50 transition">
                        <td className="p-3">{booking.room.number}</td>
                        <td className="p-3">{booking.room.type}</td>
                        <td className={`p-3 rounded-lg text-sm font-medium ${statusColors[booking.room.status] || "text-gray-600 bg-gray-100"}`}>
                          {booking.room.status}
                        </td>
                        <td className="p-3 flex justify-center">
                          {booking.userId.trim() === currentUserId ? (
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg"
                            >
                              Cancel Booking
                            </button>
                          ) : (
                            <span className="text-gray-400">Not your booking</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-gray-600">
                        No booked rooms
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default ListRooms;
