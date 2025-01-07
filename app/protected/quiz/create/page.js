'use client';

import { useAuth } from '@/app/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import CreateQuiz from '@/app/components/quizComponents/CreateQuiz';

export default function CreateQuizPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("Loading state:", loading); 
    console.log("User state:", user); 
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
      <h1 className="text-xl font-bold mb-4">Stwórz Quiz</h1>
      <CreateQuiz />
    </div>
  );
}