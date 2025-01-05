'use client';

import { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';

export default function ProfilePage() {
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const user = auth.currentUser;

  // Function to handle profile update
  const onSubmit = (e) => {
    e.preventDefault();
    updateProfile(user, {
      displayName,
      photoURL,
    })
      .then(() => {
        setSuccess(true);
        setError('');
      })
      .catch((error) => {
        setError(error.message);
        setSuccess(false);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Edytuj Profil</h1>
      
      {/* Error Alert */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
          {error}
        </div>
      )}

      {/* Success Alert */}
      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
          Profil zaktualizowany pomyślnie!
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
            Nazwa użytkownika
          </label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Adres email (tylko do odczytu)
          </label>
          <input
            type="email"
            id="email"
            value={user?.email || ''}
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">
            URL zdjęcia profilowego
          </label>
          <input
            type="text"
            id="photoURL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Conditionally render profile picture */}
        {photoURL && (
          <div className="mb-4">
            <img src={photoURL} alt="Profile" className="w-32 h-32 rounded-full mx-auto" />
          </div>
        )}

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-pink-300 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Zaktualizuj profil
        </button>
      </form>
    </div>
  );
}