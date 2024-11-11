import React from 'react';
import tw from 'tailwind-styled-components';

const Suggestions = ({ suggestions, onClose }) => {
  return (
    <SuggestionsPopup>
      <PopupCard>
        <PopupHeader>
          <h2 className="text-2xl font-bold text-gray-800">Suggestions for You:</h2>
        </PopupHeader>
        <PopupContent>
          <ul className="list-disc list-inside text-lg text-gray-700">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="my-2">{suggestion}</li>
            ))}
          </ul>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </PopupContent>
      </PopupCard>
    </SuggestionsPopup>
  );
};

const SuggestionsPopup = tw.div`
  fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 p-4 z-20
`;

const PopupCard = tw.div`
  bg-white rounded-lg shadow-xl w-full md:w-4/5 lg:w-3/4 xl:w-1/2 p-8 
  transition-transform transform hover:scale-105
`;

const PopupHeader = tw.div`
  border-b border-gray-300 pb-4 mb-6
`;

const PopupContent = tw.div`
  flex flex-col items-center
`;

const CloseButton = tw.button`
  mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg
  hover:bg-blue-700 transition-colors duration-200 text-lg
`;

export default Suggestions;
