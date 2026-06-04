import React from 'react';
import { Link } from 'wouter';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <p className="text-8xl font-black text-gray-200">404</p>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Pagina non trovata</h1>
        <p className="mt-2 text-gray-500">La pagina che stai cercando non esiste o è stata spostata.</p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition"
          >
            Torna alla Home
          </Link>
          <Link
            href="/product-catalog"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Vai al Catalogo
          </Link>
        </div>
      </div>
    </div>
  );
}
