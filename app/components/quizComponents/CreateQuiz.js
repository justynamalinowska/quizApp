'use client';

import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; // Firebase Firestore
import { db } from "@/app/lib/firebase"; // Konfiguracja Firebase

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionType, setQuestionType] = useState("single");
  const [currentQuestion, setCurrentQuestion] = useState({
    title: "",
    content: "",
    options: [],
    correct: [],
  });

  // Dodanie pytania do quizu
  const addQuestion = () => {
    setQuestions([...questions, { ...currentQuestion, type: questionType }]);
    setCurrentQuestion({ title: "", content: "", options: [], correct: [] });
  };

  // Funkcja zapisywania quizu do Firestore
  const saveQuiz = async () => {
    if (!quizTitle || questions.length === 0) {
      alert("Podaj tytuł quizu i dodaj pytania!");
      return;
    }

    try {
      await addDoc(collection(db, "quizzes"), {
        title: quizTitle,
        questions,
      });
      alert("Quiz zapisany pomyślnie!");
      setQuizTitle(""); // Resetuj tytuł
      setQuestions([]); // Resetuj pytania
    } catch (error) {
      console.error("Błąd podczas zapisywania quizu:", error);
      alert("Nie udało się zapisać quizu.");
    }
  };

  // Funkcja aktualizowania wartości pola pytania
  const handleInputChange = (field, value) => {
    setCurrentQuestion((prev) => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions[index] = value;
    setCurrentQuestion((prev) => ({ ...prev, options: updatedOptions }));
  };

  const handleCorrectOptionChange = (index) => {
    if (questionType === "single") {
      setCurrentQuestion((prev) => ({ ...prev, correct: [index] }));
    } else {
      const updatedCorrect = [...currentQuestion.correct];
      if (updatedCorrect.includes(index)) {
        updatedCorrect.splice(updatedCorrect.indexOf(index), 1);
      } else {
        updatedCorrect.push(index);
      }
      setCurrentQuestion((prev) => ({ ...prev, correct: updatedCorrect }));
    }
  };

  const addOption = () => {
    setCurrentQuestion((prev) => ({ ...prev, options: [...prev.options, ""] }));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Stwórz Quiz</h1>
      <div className="space-y-4">
        {/* Tytuł quizu */}
        <label className="block">
          Tytuł quizu:
          <input
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </label>

        {/* Typ pytania */}
        <label className="block">
          Typ pytania:
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="single">Pojedynczy wybór</option>
            <option value="multiple">Wielokrotny wybór</option>
            <option value="fill">Uzupełnianie pól</option>
            <option value="match">Dopasowanie par</option>
          </select>
        </label>

        {/* Tytuł pytania */}
        <label className="block">
          Tytuł pytania:
          <input
            type="text"
            value={currentQuestion.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="border p-2 rounded w-full"
          />
        </label>

        {/* Treść pytania */}
        <label className="block">
          Treść pytania:
          <textarea
            value={currentQuestion.content}
            onChange={(e) => handleInputChange("content", e.target.value)}
            className="border p-2 rounded w-full"
          />
        </label>

        {/* Opcje pytania */}
        {["single", "multiple"].includes(questionType) && (
          <div className="space-y-2">
            <h3>Opcje:</h3>
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type={questionType === "single" ? "radio" : "checkbox"}
                  name="correctOption"
                  checked={currentQuestion.correct.includes(index)}
                  onChange={() => handleCorrectOptionChange(index)}
                />
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="border p-2 rounded w-full"
                />
              </div>
            ))}
            <button
              onClick={addOption}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Dodaj opcję
            </button>
          </div>
        )}

        {/* Dodanie pytania */}
        <button
          onClick={addQuestion}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Dodaj pytanie
        </button>

        {/* Zapisz quiz */}
        <button
          onClick={saveQuiz}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 mt-4"
        >
          Zapisz Quiz
        </button>
      </div>
    </div>
  );
};

export default CreateQuiz;
