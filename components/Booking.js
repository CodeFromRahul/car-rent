import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { getCarList } from "../data/carList";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const Booking = ({
  handlebooking,
  selectedCar,
  setSelectedCar,
  pickup,
  dropoff,
  tripType,
  days,
  pickupDate,
  Price,
  formType,
  Package,
  rideDistance,
  pickupTime,
}) => {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [carList, setCarList] = useState([]);
  const [bookingDone, setBookingDone] = useState(false);
  const indianFormattedPrice = Number(Price).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const bookingData = {
      name,
      lname,
      phone,
      formType,
      tripType,
      pickup,
      dropoff,
      pickupDate,
      pickupTime,
      days,
      selectedCar,
      Price,
      Package,
    };
  
    try {
      const response = await fetch("/api/send-email", { //api end point
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        setBookingDone(true);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send email");
    }
  };

//   try {
//     const response = await fetch(
//       `https://api.callmebot.com/whatsapp.php?phone=918010955252&text=${encodeURIComponent(
//         `${text}`
//       )}&apikey=7911773`
//     );
//   } catch (error) {
//     console.error(error);
//   }
//   setBookingDone(true);
// };
  
  useEffect(() => {
    const fetchCars = async () => {
      setCarList(await getCarList());
    };
    fetchCars();
    if (bookingDone) {
      setTimeout(() => {
        window.location.reload(); // Refresh the browser after a certain duration
      }, 4000); // 4000 milliseconds = 4 seconds
    }
  }, [bookingDone]);

  return (
    <>
      <Buttoncon>
        <Back
          alt="Back button"
          onClick={handlebooking}
          src="https://img.icons8.com/ios-filled/50/000000/left.png"
        />
      </Buttoncon>
      <div className="flex height w-full overflow-y-scroll gap-2 items-center justify-center flex-col md:flex-row">
        <div
          id="form"
          className="flex-1 flex w-full h-full rounded-xl items-center justify-center "
        >
          <InputContainer onSubmit={handleFormSubmit}>
            <InputBoxes>
              <Input
                placeholder="First Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                required
              />
              <Input
                placeholder="Last Name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                type="text"
                required
              />
              <Input
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                required
              />
              {/* <Input
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              /> */}
            </InputBoxes>
            <ConfirmBtn type="submit" value="Submit" />
          </InputContainer>
        </div>
        <div className="flex-1 flex flex-col h-full w-full rounded-xl items-center border border-gray-600 justify-center overflow-y-scroll">
          <div className="flex flex-col w-full h-full p-2 rounded-xl">
            {bookingDone && (
              <div className="popup-animation h-screen w-screen flex items-center justify-center">
                <div className="popup-content bg-white h-52 max-w-lg w-full rounded-lg shadow-md flex flex-col gap-4 items-center justify-center">
                  <div className="popup-icon h-16 w-16"></div>
                  <div className="flex flex-col gap-1 items-center justify-center">
                    <h2 className="font-semibold text-[#3BA09A]">Inquiry submitted!!</h2>
                    <h2 className="text-lg">Kindly lookout for our call.</h2>
                    <h2 className="text-lg">Thank You🙏</h2>
                  </div>
                </div>
              </div>
            )}
            <div className="w-full flex justify-center items-center border-b border-gray-600">
              <h1 className="text-gray-500 text-center text-lg">
                Scroll To View More
              </h1>
            </div>
            <div className="flex justify-between border-b border-gray-600 gap-4 py-2 flex-col md:flex-row items-center w-full">
              <div
                alt="Selected Car Image"
                className={`w-full md:w-1/2 aspect-square border-b md:border-r md:border-b-0 border-gray-600 ${selectedCar.imgUrl}`}
              ></div>
              <CarDetails className="flex-1 flex justify-center mb-4 md:mb-0">
                <Service>{selectedCar.service}</Service>
                <h3 className="text-xl text-center">
                  {selectedCar.seaters + " seaters"}
                </h3>
              </CarDetails>
            </div>
            <div className="w-full justify-center flex text-lg border-b border-gray-600 py-2 ">
              <div className="flex flex-col items-start gap-2">
                <h2 className="flex text-green-700 ">
                  Pickup:- <span className="text-black">{pickup}</span>
                </h2>
                <h2 className="flex text-red-500 gap-2">
                  Dropoff:- <span className="text-black">{dropoff}</span>
                </h2>
                <h2 className="flex gap-2">
                  DutyType:-
                  <span className="text-black">
                    {formType === "Local Transport"
                      ? formType + "(" + Package + ")"
                      : formType + "(" + tripType + ")"}
                  </span>
                </h2>
                <h2 className="flex gap-2">
                  Pickup Date-Time:-
                  <span className="text-black">{pickupDate + " , " + pickupTime}</span>
                </h2>
              </div>
            </div>
            <div className="flex py-2 justify-center items-center w-full font-uber font-semibold text-4xl border-b border-gray-600">
              <h2>{indianFormattedPrice}</h2>
            </div>
            <div className="py-2 flex flex-col justify-center items-center gap-3">
              <h2 className="text-xl font-semibold">Fare Breakup</h2>
              {formType === "OutStation" && tripType === "Round Trip" && (
                <ul className="flex flex-col gap-2">
                  <li>
                    &#x2022;{" "}
                    {"Outstation (Roundtrip " +
                      days +
                      " day/s) " +
                      indianFormattedPrice +
                      " Excluding 5% GST"}
                  </li>
                  <li>
                    &#x2022; {"Minimum distance / day " + "300 Km"}
                  </li>
                  <li>
                    &#x2022;{" "}
                    {selectedCar.index !== undefined && carList[selectedCar.index]
                      ? `extra amount per km ₹${carList[selectedCar.index].extraKm}`
                      : "extra amount per km data not available"}
                  </li>
                  <li>
                    &#x2022; extra charges driver allowance Day ₹400 / Night(11:00 PM to 5:00 AM) ₹300 
                  </li>
                  <li>
                    &#x2022; Opening KM/Time and Closing Time/Km will calculate from Our garage to garage
                  </li>
                  <li>
                    &#x2022; All Parking, Toll, Border Tax wherever applicable will be charged extra
                  </li>
                  <li>
                    &#x2022; One Day means one calendar day (from midnight 11 to midnight 11)
                  </li>
                </ul>
              )}
              {formType === "OutStation" && tripType === "One Way" && (
                <ul className="flex flex-col gap-2">
                  <li>
                    &#x2022;{" "}
                    {"Outstation (Oneway) ( " +
                      indianFormattedPrice +
                      " Excluding 5% GST )"}
                  </li>
                  <li>
                    &#x2022; All Parking, Toll, Border Tax wherever applicable will be charged extra
                  </li>
                  <li>
                    &#x2022; Opening KM/Time and Closing Time/Km will calculate from Our garage to garage
                  </li>
                </ul>
              )}
              {formType === "Local Transport" && (
                <ul className="flex flex-col gap-2">
                  <li>
                    &#x2022;{" "}
                    {"Local Transport ( " +
                      indianFormattedPrice +
                      " Excluding 5% GST )"}
                  </li>
                  <li>&#x2022; Duration - 1 Day (Toll and parking extra).</li>
                  <li>
                    &#x2022; {"Extra charge per hour : ₹" + selectedCar.extraHr}
                  </li>
                  <li>
                    &#x2022; {"Extra charge per km : ₹" + selectedCar.extraKm}
                  </li>
                  <li>
                    &#x2022; Opening KM/Time and Closing Time/Km will calculate from Our garage to garage
                  </li>
                </ul>
              )}
              {formType === "Airport" && (
                <ul className="flex flex-col gap-2">
                  <li>
                    &#x2022;{" "}
                    {"Airport Transfer (AIRPORTDROP) :" + indianFormattedPrice + " ( Excluding 5% GST )"}
                  </li>
                  <li>&#x2022; Toll and parking extra.</li>
                  <li>
                    &#x2022; {"Extra charge per hour : ₹" + selectedCar.extraHr}
                  </li>
                  <li>
                    &#x2022; {"Extra charge per km : ₹" + selectedCar.extraKm}
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Booking;

const Back = tw.img`
h-8 cursor-pointer 
`;
const Buttoncon = tw.div`
flex w-8 rounded-full bg-white fixed z-10 shadow-md cursor-pointer
`;
const InputContainer = tw.form`
 flex flex-col w-full border h-full p-2 border-gray-600 rounded-xl 
`;
const InputBoxes = tw.div`
flex flex-col flex-1
`;
const Input = tw.input`
h-12 bg-gray-200 my-2 rounded-md p-2 outline-none borber-none btn1
`;
const Service = tw.div`
  font-bold text-3xl 
`;
const CarDetails = tw.div`
flex flex-col justify-center items-center
`;
const ConfirmBtn = tw.input`
 shadow-md bg-[#0080ff]  border-gray-600 text-white my-2 py-3 text-center text-xl cursor-pointer rounded-lg font-medium
`;
