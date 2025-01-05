'use client';

import { useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "@/app/lib/AuthContext";

export default function VerifyEmail() {
  const { user } = useAuth();
  const auth = getAuth();

  useEffect(() => {
    // Automatyczne wylogowanie użytkownika
    signOut(auth).then(() => {
      console.log("User signed out automatically.");
    }).catch((error) => {
      console.error("Error signing out:", error);
    });
  }, [auth]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold mb-4">Email nie został zweryfikowany</h1>
      <p className="text-gray-700 mb-6">
        Zweryfikuj swój adres klikając w link wysłany na Twój adres email:
      </p>
      <p className="text-blue-500 font-medium">{user?.email || "Brak adresu email"}</p>
      <p className="mt-6 text-sm text-gray-500">Po zweryfikowaniu adresu email zaloguj się ponownie.</p>
    </div>
  );
}