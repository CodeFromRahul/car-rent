import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";


export const getCarList = async () => {
  try {
    const carsRef = collection(db, 'cars');
    const querySnapshot = await getDocs(carsRef);
    const cars = querySnapshot.docs.map((doc) => doc.data());

    // Format the cars to match the carList structure
    const carList = cars.map((car, index) => ({
      imgUrl: car.imgUrl,
      service: car.service,
      seaters: car.seaters,
      index: index,
      "8|80": car["8|80"],
      extraHr: car.extraHr,
      extraKm: car.extraKm,
      airport: car.airport
    }));

    return carList;
  } catch (error) {
    console.error('Error fetching car data:', error);
    return [];
  }
};