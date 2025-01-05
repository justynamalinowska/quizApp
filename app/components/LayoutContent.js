'use client';

import { useAuth } from "@/app/lib/AuthContext";
import { FaHome, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import LogoutForm from "@/app/components/LogoutForm";

export default function LayoutContent({ children }) {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white flex flex-col items-center py-4">
        <nav className="space-y-4 w-full px-4">
          <a href="/" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-700">
            <FaHome className="text-lg" /> Home
          </a>
          <a href="/public/user/signin" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-700">
            <FaSignInAlt className="text-lg" /> Logowanie
          </a>
          <a href="/public/user/register" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-700">
            <FaUserPlus className="text-lg" /> Rejestracja
          </a>
          {user && (
            <>
              <a href="/protected/user/profile" className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-700">
                <img src={user.photoURL || '/default-profile.png'} alt="Profile" className="w-8 h-8 rounded-full" />
                <span>{user.displayName || "User"}</span>
              </a>
              <LogoutForm />
            </>
          )}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="bg-pink-500 text-white py-3 px-6 shadow-md flex justify-between items-center">
          <h1 className="text-xl font-bold">Quiz app</h1>
          <div className="space-x-4">
            <a href="/public/user/signin" className="px-4 py-2 bg-gray-700 text-white rounded-md text-sm font-medium hover:bg-gray-600">
              Logowanie
            </a>
            <a href="/public/user/register" className="px-4 py-2 bg-gray-700 text-white rounded-md text-sm font-medium hover:bg-gray-600">
              Rejestracja
            </a>
            <a href="/protected/user/signout" className="px-4 py-2 bg-gray-700 text-white rounded-md text-sm font-medium hover:bg-gray-600">
              Wyloguj
            </a>
          </div>
        </header>
        <main className="flex-1 container mx-auto py-6 px-4">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-4 text-center">
          &copy; 2024 Quiz App React - Justyna Malinowska
        </footer>
      </div>
    </div>
  );
}