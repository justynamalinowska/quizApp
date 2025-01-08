'use client';

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "quizzes"));
        const quizList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuizzes(quizList);
      } catch (error) {
        console.error("Błąd podczas pobierania quizów:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return <div>Ładowanie quizów...</div>;
  }

  if (quizzes.length === 0) {
    return <div>Brak quizów do wyświetlenia.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Dostępne Quizy</h1>
      <ul className="space-y-4">
        {quizzes.map((quiz) => (
          <li key={quiz.id} className="p-4 border rounded shadow-md">
            <h2 className="font-bold">{quiz.title}</h2>
            <p>Liczba pytań: {quiz.questions.length}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
