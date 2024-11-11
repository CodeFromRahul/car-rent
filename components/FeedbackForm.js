// components/FeedbackForm.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const FeedbackForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'testimonials'), {
        name,
        feedback,
        createdAt: new Date(),
      });
      onSubmit(); // Call onSubmit to refresh the testimonials
      setName('');
      setFeedback('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border p-2 mb-4 w-full"
      />
      <textarea
        placeholder="Your Feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        required
        className="border p-2 mb-4 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
