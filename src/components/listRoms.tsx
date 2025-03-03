"use client";
import { useEffect, useState } from "react";

const API_URL_ROOMS = process.env.NEXT_PUBLIC_API_URL + "rooms";


interface Room {
  number: number;
  type: string;
  status: string;
}

const statusColors: Record<string, string> = {
  Available: "text-green-600 bg-green-100",
  Booked: "text-red-600 bg-red-100",
  Maintenance: "text-yellow-600 bg-yellow-100"
};

const ListRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const fetchRooms = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQwYzI1MzRiLTc5YjAtNDJiYy05YzAwLWZmMTdiMjViY2Y5ZiIsImVtYWlsIjoiYWxpQGdtYWlsLmNvbSIsImlhdCI6MTc0MTAwMDYzMSwiZXhwIjoxNzQxMDA0MjMxfQ.jmxKfcBwtxFxj0e-Ogo9-AaaG2ijl8QaERDc1ryGTUE"
      setLoading(true);
      const response = await fetch(API_URL_ROOMS, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error("Failed to fetch rooms");

      const data: Room[] = await response.json();
      setRooms(data);
      setFilteredRooms(data);
      setError("");
    } catch (err: any) {

      setError(`Error fetching rooms. Please try again. `);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const toggleAvailableRooms = () => {
    if (showOnlyAvailable) {
      setFilteredRooms(rooms);
    } else {
      setFilteredRooms(rooms.filter((room) => room.status === "Available"));
    }
    setShowOnlyAvailable(!showOnlyAvailable);
  };

  const handleBooking = (roomNumber: number) => {
    console.log(`تم حجز الغرفة رقم: ${roomNumber}`);
    alert(`تم حجز الغرفة رقم: ${roomNumber}`);
  };

  return (
    <div className="container mx-auto mt-6 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Room List</h2>

        {/* زر تصفية الغرف المتاحة */}
        <div className="mb-4">
          <button
            onClick={toggleAvailableRooms}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {showOnlyAvailable ? "Show All Rooms" : "Show Available Rooms"}
          </button>
        </div>

        {loading && <p className="text-center text-gray-500">Loading rooms...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
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
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50 transition">
                    <td className="p-3">{room.number}</td>
                    <td className="p-3">{room.type}</td>
                    <td className={`p-3 rounded-lg text-sm font-medium ${statusColors[room.status] || "text-gray-600 bg-gray-100"}`}>
                      {room.status}
                    </td>
                    <td className="p-3">
                      {room.status === "AVAILABLE" ? (
                        <button
                          onClick={() => handleBooking(room.number)}
                          className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white font-semibold px-6 py-3 rounded-lg w-full shadow-md transition duration-300"
                        >
                          Book
                        </button>
                      ) : (
                        <span className="text-gray-500 flex justify-center">Not Available</span>
                      )}
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
        )}
      </div>
    </div>
  );
};

export default ListRooms;
