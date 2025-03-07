"use client";
import { useRouter } from "next/navigation";
export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.clear()
    router.push('/login');
  };
  return <button onClick={handleLogout} className="bg-gradient-to-r from-green-600 to-green-800 hover:from-white rounded-full py-4 px-10 text-md md:text-xl font-bold cursor-pointer tracking-wider text-white border-green-800 md:border-2 hover:text-green-800 transition ease-out duration-200">Logout</button>;
}
