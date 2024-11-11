// pages/testimonials.js
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FeedbackForm from "../components/FeedbackForm";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase/config';
import { FaQuoteLeft, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    const querySnapshot = await getDocs(collection(db, 'testimonials'));
    const testimonialsData = querySnapshot.docs.map(doc => {
      const data = doc.data();
      const rating = calculateRating(data.feedback); // Determine rating based on feedback
      return { id: doc.id, ...data, rating };
    });
    setTestimonials(testimonialsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Function to calculate rating based on keywords in feedback
  const calculateRating = (feedback) => {
    const positiveWords = ["great", "excellent", "amazing", "love", "fantastic","good","beautiful","food","loved","best"];
    const negativeWords = ["bad", "poor", "terrible", "dislike", "awful","better","worst"];

    const feedbackLower = feedback.toLowerCase();

    if (positiveWords.some(word => feedbackLower.includes(word))) return 5;
    if (negativeWords.some(word => feedbackLower.includes(word))) return 1;

    return 3; // Neutral rating if neither positive nor negative words are found
  };

  // Function to render star rating with more spacing
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center space-x-1 mt-4 mb-4">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-500 text-2xl" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-500 text-2xl" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-yellow-500 text-2xl" />
        ))}
      </div>
    );
  };

  return (
    <section className="body-font min-h-screen">
      <Navbar />
      <div className="container px-5 pt-24 mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-16 text-center transition-all duration-300 hover:scale-105">
          Testimonials
        </h1>

        {/* Feedback Form */}
        <div className="max-w-2xl mx-auto mb-20 bg-gray-50 p-10 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-2xl">
          <FeedbackForm onSubmit={fetchTestimonials} />
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-300 h-14 w-14"></div>
          </div>
        ) : (
          <div className="flex flex-wrap -m-4">
            {testimonials.map(({ id, name, feedback, rating = 0 }) => (
              <div key={id} className="p-6 md:w-1/2 w-full">
                <div className="h-full bg-white p-10 rounded-lg border border-gray-200 shadow-lg transition transform hover:scale-105 hover:shadow-2xl">
                  <div className="flex items-start mb-6">
                    <FaQuoteLeft className="text-3xl text-gray-300 mr-4" />
                    <p className="leading-relaxed text-lg text-gray-700">{feedback}</p>
                  </div>
                  <div className="flex flex-col items-start mt-4">
                    <span className="title-font font-semibold text-xl text-gray-900 mb-2">{name}</span>
                    {renderStars(rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .loader {
          border-top-color: #3498db;
          animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}

export default Testimonials;
