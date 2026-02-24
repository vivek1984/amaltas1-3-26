import React from "react";

export default function QuestionPrompt({ question, onAnswer }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
      <div className="bg-white rounded-2xl p-6 shadow-lg max-w-sm text-center">
        <h2 className="text-lg font-semibold mb-4">{question}</h2>
        <div className="flex justify-around">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
            onClick={() => onAnswer("yes")}
          >
            Yes
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
            onClick={() => onAnswer("no")}
          >
            No
          </button>


        </div>
        <p className="text-xs block bg-blue-100 mt-5 border rounded-2xl border-r-amber-100 p-2">Bulky Products can only be shipped near Dehradun.</p>
      </div>
    </div>
  );
}
