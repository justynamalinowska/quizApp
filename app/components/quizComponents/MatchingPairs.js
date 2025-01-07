import React, { useState } from 'react';

const MatchingPairs = ({ question, pairs, onAnswer }) => {
    const [answers, setAnswers] = useState({});

    const handleChange = (key, value) => {
        setAnswers((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        onAnswer(answers);
    };

    return (
        <div className="p-4 border rounded-lg bg-white shadow-md">
            <h2 className="text-lg font-bold mb-2">{question}</h2>
            <div className="space-y-2">
                {pairs.map((pair, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <span>{pair.left}</span>
                        <select
                            onChange={(e) => handleChange(pair.left, e.target.value)}
                            className="border p-2 rounded"
                        >
                            <option value="">Select</option>
                            {pair.rightOptions.map((option, i) => (
                                <option key={i} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
            <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
                Submit
            </button>
        </div>
    );
};

export default MatchingPairs;