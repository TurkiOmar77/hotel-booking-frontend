"use client";
// import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function LogoutButton() {
//   const router = useRouter();
//   const handleLogout = () => {
//     Cookies.remove("token"); // Remove token from cookies
//     router.push('/login');
//   };
//                            bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white font-semibold px-6 py-3 rounded-lg w-full shadow-md transition duration-300
  return <button className="bg-gradient-to-r from-green-600 to-green-800 hover:from-white rounded-full py-4 px-10 text-md md:text-xl font-bold cursor-pointer tracking-wider text-white border-green-800 md:border-2 hover:text-green-800 transition ease-out duration-200">Logout</button>;
}
