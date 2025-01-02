import React from 'react';

export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-red-500">404 - Strona nie znaleziona</h1>
        <p className="mt-4 text-lg">Nie znaleziono strony, której szukasz.</p>
        <a href="/" className="mt-6 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          Powrót na stronę główną
        </a>
      </div>
    );
  }
  