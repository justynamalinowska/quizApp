import React, { useState } from 'react';

const FillInTheBlanks = ({ question, blanks, onAnswer }) => {
    const [answers, setAnswers] = useState({});

    const handleChange = (index, value) => {
        setAnswers((prev) => ({ ...prev, [index]: value }));
    };

    const handleSubmit = () => {
        onAnswer(answers);
    };

    return (
        <div className="p-4 border rounded-lg bg-white shadow-md">
            <h2 className="text-lg font-bold mb-2">{question}</h2>
            <div className="space-y-2">
                {blanks.map((blank, index) => (
                    <div key={index} className="flex flex-col space-y-1">
                        <label>{blank.prompt}</label>
                        <input
                            type="text"
                            value={answers[index] || ''}
                            onChange={(e) => handleChange(index, e.target.value)}
                            className="border p-2 rounded"
                        />
                    </div>
                ))}
            </div>
            <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
                Submit
            </button>
        </div>
    );
};

export default FillInTheBlanks;