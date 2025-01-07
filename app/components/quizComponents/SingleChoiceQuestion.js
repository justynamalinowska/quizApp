import React, { useState } from 'react';

const SingleChoiceQuestion = ({ question, options, onAnswer }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSubmit = () => {
        if (selectedOption !== null) {
            onAnswer(selectedOption);
        }
    };

    return (
        <div className="p-4 border rounded-lg bg-white shadow-md">
            <h2 className="text-lg font-bold mb-2">{question}</h2>
            <div className="space-y-2">
                {options.map((option, index) => (
                    <label key={index} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="single-choice"
                            value={option}
                            checked={selectedOption === option}
                            onChange={() => setSelectedOption(option)}
                            className="form-radio"
                        />
                        <span>{option}</span>
                    </label>
                ))}
            </div>
            <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Submit
            </button>
        </div>
    );
};
export default SingleChoiceQuestion;