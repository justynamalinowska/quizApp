'use client';

import { useAuth } from '@/app/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function QuizPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/public/user/signin'); 
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Ładowanie...</div>;
  }

  if (!user) {
    return null; 
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Dostępne Quizy</h1>
      <p>Możesz teraz zobaczyć swoje quizy, ponieważ jesteś zalogowany.</p>
    </div>
  );
}
