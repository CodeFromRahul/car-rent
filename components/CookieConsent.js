// components/CookieConsent.js
import React from 'react';
import tw from "tailwind-styled-components";

const CookieConsent = ({ onAccept, onReject }) => {
  return (
    <ConsentWrapper>
      <ConsentBox>
        <ConsentIcon>🍪</ConsentIcon>
        <ConsentText>
          We use cookies to enhance your experience. By accepting, you consent to our use of cookies.
        </ConsentText>
        <ButtonWrapper>
          <ConsentButton onClick={onAccept}>Accept</ConsentButton>
          <ConsentButton onClick={onReject}>Reject</ConsentButton>
        </ButtonWrapper>
      </ConsentBox>
    </ConsentWrapper>
  );
};

const ConsentWrapper = tw.div`
  fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-20 transition-opacity duration-300
`;

const ConsentBox = tw.div`
  bg-white p-6 rounded-lg shadow-lg w-90 text-center transform transition-transform duration-300
  scale-100 hover:scale-105
`;

const ConsentIcon = tw.div`
  text-4xl mb-4
`;

const ConsentText = tw.p`
  mb-6 text-gray-800 font-medium text-lg
`;

const ButtonWrapper = tw.div`
  flex justify-center space-x-4
`;

const ConsentButton = tw.button`
  bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200
`;

export default CookieConsent;
