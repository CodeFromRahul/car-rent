import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import RideSelector from "./RideSelector";
import Booking from "./Booking";
import Link from "next/link";
import { BsFillTelephoneFill, BsFacebook, BsLinkedin } from "react-icons/bs";
import { MdEmail, MdLocationOn, MdLocalOffer } from "react-icons/md";
import Navbar from "./Navbar";

const Confirm = ({
  pickupCoordinates,
  dropoffCoordinates,
  handleconfirm,
  pickup,
  dropoff,
  tripType,
  days,
  pickupDate,
  formType,
  pickupTime,
  Package,
}) => {
  const [booking, setBooking] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [Price, setPrice] = useState(0);
  const [rideDistance, setDistance] = useState(0);
  const handlebooking = () => {
    setBooking(!booking);
  };
  return (
    <Wrapper>
      <Navbar />
      {!booking && (
        <>
          <Buttoncon>
            <Back
              onClick={handleconfirm}
              src="https://img.icons8.com/ios-filled/50/000000/left.png"
            />
          </Buttoncon>
          <RideContainer>
            <RideSelector
              pickupCoordinates={pickupCoordinates}
              dropoffCoordinates={dropoffCoordinates}
              tripType={tripType}
              handlebooking={handlebooking}
              selectedCar={selectedCar}
              setSelectedCar={setSelectedCar}
              setPrice={setPrice}
              formType={formType}
              Package={Package}
              price={Price}
              days={days}
              rideDistance={rideDistance}
              setDistance={setDistance}
            />
          </RideContainer>
        </>
      )}
      {booking && (
        <div className="p-2">
          <Booking
            handlebooking={handlebooking}
            selectedCar={selectedCar}
            setSelectedCar={setSelectedCar}
            pickup={pickup}
            dropoff={dropoff}
            tripType={tripType}
            Package={Package}
            pickupDate={pickupDate}
            pickupTime={pickupTime}
            days={days}
            Price={Price}
            formType={formType}
            rideDistance={rideDistance}
          />
        </div>
      )}
    </Wrapper>
  );
};

export default Confirm;

const Wrapper = tw.div`
h-screen flex flex-col w-full
`;
const RideContainer = tw.div`
flex-1 flex flex-col h-1/2
`;
const ConfirmBtn = tw.div`
bg-black text-white my-4 mx-4 py-3 text-center text-xl rounded-md font-uber
`;
const BtnCon = tw.div`
border-t-2
`;
const Back = tw.img`
h-8 cursor-pointer 
`;
const Buttoncon = tw.div`
flex w-8 rounded-full bg-white fixed z-10 m-2 top-12 shadow-md cursor-pointer
`;
