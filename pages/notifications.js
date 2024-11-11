// pages/notifications.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config'; // Ensure correct path to Firebase config
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { AiOutlineArrowLeft } from 'react-icons/ai';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchNotifications = async () => {
      const notificationsCollection = collection(db, 'notifications');
      const notificationSnapshot = await getDocs(notificationsCollection);

      if (notificationSnapshot.empty) {
        await addInitialNotifications();
      } else {
        const notificationsList = notificationSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNotifications(notificationsList);
      }
    };

    const addInitialNotifications = async () => {
      const initialNotifications = [
        { title: "Welcome to Rent-Ease", message: "Thank you for signing up!", timestamp: Timestamp.now() },
        { title: "New Feature Release", message: "Explore the latest features!", timestamp: Timestamp.now() },
        { title: "Limited Time Offer", message: "Get discounts on your next rental!", timestamp: Timestamp.now() }
      ];

      const notificationsCollection = collection(db, 'notifications');
      for (const notification of initialNotifications) {
        await addDoc(notificationsCollection, notification);
      }

      const updatedSnapshot = await getDocs(notificationsCollection);
      const updatedNotifications = updatedSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotifications(updatedNotifications);
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    if (notifications.length > 1) {
      const intervalId = setInterval(() => {
        setCurrentNotificationIndex((prevIndex) => (prevIndex + 1) % notifications.length);
      }, 3000);
      return () => clearInterval(intervalId);
    }
  }, [notifications]);

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-white">
      {/* <button 
        onClick={() => router.back()} 
        className="flex items-center text-blue-600 mb-6"
      >
        <AiOutlineArrowLeft className="mr-2" /> Back
      </button> */}

      <h1 className="text-3xl font-bold mb-6">Notifications</h1>

      {/* Current Notification Section */}
      <div className="w-full max-w-5xl">
        {notifications.length > 0 && (
          <div className="relative overflow-hidden w-full h-48 flex justify-center items-center bg-white rounded-lg shadow-lg border border-blue-300 p-4 text-center mb-6 transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-blue-50 hover:shadow-xl">
            {notifications.map((notification, index) => (
              <div
                key={notification.id}
                className={`absolute transition-all duration-500 ease-in-out ${
                  index === currentNotificationIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
              >
                <h2 className="text-xl font-semibold text-blue-600 mb-1">{notification.title}</h2>
                <p className="text-gray-600">{notification.message}</p>
                <span className="text-gray-400 text-sm mt-2 block">
                  {notification.timestamp ? new Date(notification.timestamp.seconds * 1000).toLocaleString() : 'No timestamp'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* All Notifications List Section */}
      <h2 className="text-2xl font-semibold mb-4">All Notifications</h2>
      <ul className="w-full max-w-5xl space-y-4">
        {notifications.map(notification => (
          <li key={notification.id} className="notification-item p-4 bg-white border border-blue-300 rounded-lg shadow-md transition-transform transform hover:scale-105  hover:bg-blue-50 hover:shadow-xl">
            <h3 className="font-bold text-blue-700">{notification.title}</h3>
            <p className="text-gray-700">{notification.message}</p>
            <span className="text-gray-500 text-sm">
              {notification.timestamp ? new Date(notification.timestamp.seconds * 1000).toLocaleString() : 'No timestamp'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
