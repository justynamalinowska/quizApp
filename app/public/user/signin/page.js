'use client'
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getAuth } from 'firebase/auth'
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from 'react';

export default function SignInForm() {
  const [error, setError] = useState('');
  const auth = getAuth();
  const params = useSearchParams();
  const router = useRouter();
  const returnUrl = params.get("returnUrl");

  const onSubmit = (e) => {
    e.preventDefault();
    const email = e.target["email"].value;
    const password = e.target["password"].value;
    setPersistence(auth, browserSessionPersistence)
    .then(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          if (returnUrl) {
            router.push(returnUrl);
          } else {
            router.push('/');
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    })
    .catch(error => {
      setError(error.message);
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Logowanie</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="preline-form-input mt-1 block w-full"
            placeholder="Wpisz swój email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Hasło
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="preline-form-input mt-1 block w-full"
            placeholder="Wpisz swoje hasło"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Zaloguj się
        </button>
      </form>
    </div>
  );
}