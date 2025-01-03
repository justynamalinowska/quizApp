'use client';

import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { useAuth } from "@/app/lib/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const { user } = useAuth();
  const router = useRouter();
  const auth = getAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerError, setRegisterError] = useState('');

  if (user) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setRegisterError("Hasła nie są zgodne.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(auth.currentUser);
      console.log("Email verification sent!");
      await signOut(auth);
      router.push('/public/user/signin'); // Po udanej rejestracji przekieruj na stronę logowania
    } catch (error) {
      setRegisterError(error.message);
      console.dir(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Rejestracja</h1>
      {registerError && <p className="text-red-500 mb-4">{registerError}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="preline-form-input mt-1 block w-full"
            placeholder="Wpisz swój email"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Hasło
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="preline-form-input mt-1 block w-full"
            placeholder="Wpisz swoje hasło"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Powtórz hasło
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="preline-form-input mt-1 block w-full"
            placeholder="Powtórz swoje hasło"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-pink-300 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Zarejestruj się
        </button>
      </form>
    </div>
  );
}