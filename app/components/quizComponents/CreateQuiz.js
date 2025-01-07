'use client';

import React, { useState } from "react";

const CreateQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [questionType, setQuestionType] = useState("single");
  const [currentQuestion, setCurrentQuestion] = useState({
    title: "",
    content: "",
    options: [],
    correct: [],
  });

  const addQuestion = () => {
    setQuestions([...questions, { ...currentQuestion, type: questionType }]);
    setCurrentQuestion({ title: "", content: "", options: [], correct: [] });
  };

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
        <label className="block">
          Tytuł pytania:
          <input
            type="text"
            value={currentQuestion.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="block">
          Treść pytania:
          <textarea
            value={currentQuestion.content}
            onChange={(e) => handleInputChange("content", e.target.value)}
            className="border p-2 rounded w-full"
          />
        </label>

        {/* Typy pytań */}
        {questionType === "single" || questionType === "multiple" ? (
          <div className="space-y-2">
            <h3>Opcje:</h3>
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                {questionType === "single" ? (
                  <input
                    type="radio"
                    name="correctOption"
                    checked={currentQuestion.correct.includes(index)}
                    onChange={() => handleCorrectOptionChange(index)}
                  />
                ) : (
                  <input
                    type="checkbox"
                    checked={currentQuestion.correct.includes(index)}
                    onChange={() => handleCorrectOptionChange(index)}
                  />
                )}
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
        ) : null}

        {questionType === "fill" && (
          <div>
            <h3>Pola do uzupełnienia:</h3>
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <span>#{index + 1}</span>
                <input
                  type="text"
                  placeholder="Pole do uzupełnienia"
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
              Dodaj pole
            </button>
          </div>
        )}

        {questionType === "match" && (
          <div>
            <h3>Dopasowanie par:</h3>
            {currentQuestion.options.map((pair, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="Lewa strona"
                  value={pair.left || ""}
                  onChange={(e) => {
                    const updatedOptions = [...currentQuestion.options];
                    updatedOptions[index] = { ...updatedOptions[index], left: e.target.value };
                    setCurrentQuestion((prev) => ({ ...prev, options: updatedOptions }));
                  }}
                  className="border p-2 rounded w-1/2"
                />
                <span>-</span>
                <input
                  type="text"
                  placeholder="Prawa strona"
                  value={pair.right || ""}
                  onChange={(e) => {
                    const updatedOptions = [...currentQuestion.options];
                    updatedOptions[index] = { ...updatedOptions[index], right: e.target.value };
                    setCurrentQuestion((prev) => ({ ...prev, options: updatedOptions }));
                  }}
                  className="border p-2 rounded w-1/2"
                />
              </div>
            ))}
            <button
              onClick={() => setCurrentQuestion((prev) => ({
                ...prev,
                options: [...prev.options, { left: "", right: "" }],
              }))}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Dodaj parę
            </button>
          </div>
        )}

        <button
          onClick={addQuestion}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Dodaj pytanie
        </button>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Podgląd pytań:</h3>
        {questions.map((q, index) => (
          <div key={index} className="p-4 border rounded bg-gray-100">
            <h4 className="font-bold">{q.title}</h4>
            <p>{q.content}</p>
            {q.type === "match" ? (
              <ul>
                {q.options.map((pair, i) => (
                  <li key={i}>
                    {pair.left} - {pair.right}
                  </li>
                ))}
              </ul>
            ) : (
              <ul>
                {q.options.map((option, i) => (
                  <li key={i}>
                    {option} {q.correct.includes(i) && "(Correct)"}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateQuiz;
