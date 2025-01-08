'use client';

import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

export default function LogoutForm() {
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => router.push("/"))
      .catch((error) => console.error("Błąd wylogowania:", error));
  };

  return (
    <form onSubmit={onSubmit} className="w-full">
      <button
        type="submit"
        className="w-full px-4 py-2 text-sm font-medium text-white bg-pink-300 rounded-lg hover:bg-pink-500"
      >
        Wyloguj
      </button>
    </form>
  );
}
