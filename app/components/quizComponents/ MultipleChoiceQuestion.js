import React, { useState } from 'react';

const MultipleChoiceQuestion = ({ question, options, onAnswer }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const toggleOption = (option) => {
        setSelectedOptions((prev) =>
            prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
        );
    };

    const handleSubmit = () => {
        if (selectedOptions.length > 0) {
            onAnswer(selectedOptions);
        }
    };

    return (
        <div className="p-4 border rounded-lg bg-white shadow-md">
            <h2 className="text-lg font-bold mb-2">{question}</h2>
            <div className="space-y-2">
                {options.map((option, index) => (
                    <label key={index} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            value={option}
                            checked={selectedOptions.includes(option)}
                            onChange={() => toggleOption(option)}
                            className="form-checkbox"
                        />
                        <span>{option}</span>
                    </label>
                ))}
            </div>
            <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Submit
            </button>
        </div>
    );
};

export default MultipleChoiceQuestion;