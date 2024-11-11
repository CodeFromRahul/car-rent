import tw from "tailwind-styled-components";
import Map from "../components/Map";
import { useEffect, useState } from "react";
import Search from "../components/Search";
import Confirm from "../components/Confirm";
import Link from "next/link";
import { BsFillTelephoneFill, BsFacebook, BsLinkedin } from "react-icons/bs";
import { toast, ToastContainer } from 'react-toastify';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { auth } from "../firebase/config";
import { UserButton } from "@clerk/nextjs";
import { addDoc, collection, getDocs } from "firebase/firestore";
import react from "react"
import { db } from "../firebase/config";
import CookieConsent from '/components/CookieConsent';
import Suggestions from "/components/Suggestions";

export default function Home() {

  const [confirm, setconfirm] = useState(false);
  const [search, setSearch] = useState(false);
  const [formType, setFormType] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [days, setDays] = useState("");
  const handleclick = () => {
    setSearch(!search);
  };
  const handleconfirm = () => {
    setconfirm(!confirm);
  };
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [tripType, setTripType] = useState("One Way");
  const [Package, setPackage] = useState("");
  const [pickupCoordinates, setpickupCoordinates] = useState([0, 0]);
  const [dropoffCoordinates, setdropoffCoordinates] = useState([0, 0]);
  const [showPopup, setShowPopup] = useState(false);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const getPickupCoordinates = (pickup) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1Ijoic2hhcmlhbiIsImEiOiJjbDg0aGQxNG8wZnhnM25sa3VlYzk1NzVtIn0.BxFbcyCbxdoSXAmSgcS5og",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        setpickupCoordinates(data.features[0].center);
      });
  };

  const getDropoffCoordinates = (dropoff) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1Ijoic2hhcmlhbiIsImEiOiJjbDg0aGQxNG8wZnhnM25sa3VlYzk1NzVtIn0.BxFbcyCbxdoSXAmSgcS5og",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        setdropoffCoordinates(data.features[0].center);
      });
  };
  useEffect(() => {
    if (pickup !== "" && dropoff !== "") {
      getPickupCoordinates(pickup);
      getDropoffCoordinates(dropoff);
    } else if (pickup !== "" && Package !== "") {
      getPickupCoordinates(pickup);
    }
    if (!search) {
      setpickupCoordinates([0, 0]);
      setdropoffCoordinates([0, 0]);
      setPickup("");
      setPackage("");
      setDropoff("");
      setTripType("Round Trip");
      setDays("");
      setFormType("");
      
    }

  }, [pickup, dropoff, Package, search]);

  useEffect(()=>{
    if(search){
    toast.info(
      "Opening KM/Time and Closing Time/Km will calculate from Our garage to garage",
      {
        position: "top-center",
        autoClose: false,
        draggablePercent: 20,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );}
  },[search])
  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  
  // useEffect(() => {
  //   const playVoiceOver = () => {
  //     const message = new SpeechSynthesisUtterance();
  //     message.text = "Rent. Explore. Thrive. Press the button below to start booking your dream ride today. Let the journey begin!";
  //     message.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'en-US' && voice.name.includes('Female'));
  //     message.rate = 1;
  //     message.pitch = 1.2;

  //     speechSynthesis.speak(message);
  //   };

  //   // Play voice-over once the voices are loaded
  //   if (window.speechSynthesis.getVoices().length > 0) {
  //     playVoiceOver();
  //   } else {
  //     window.speechSynthesis.onvoiceschanged = playVoiceOver;
  //   }
  // }, []);
  
  useEffect(() => {
    const checkCookieConsent = async () => {
      const consentDoc = await getDocs(collection(db, "cookieConsents"));
      if (!consentDoc.exists) {
        setShowCookieConsent(true);
      }
    };
    checkCookieConsent();
  }, []);

  const handleCookieAccept = async () => {
    const id = Date.now().toString();
    setShowCookieConsent(false);
    await addDoc(collection(db, "cookieConsents"),
      {
      id:id,
      consent: 'accepted',
      timestamp: new Date(),
      id:id,
     });
    // Set specific suggestions after accepting cookies
    setSuggestions([
      "Book a Maruti Dzire for an economical ride. This compact sedan is perfect for city travel and weekend getaways, offering a comfortable interior and impressive fuel efficiency. With its stylish design and user-friendly features, the Dzire ensures a delightful driving experience.",
      
      "Consider the Toyota Innova for family trips. Known for its spacious cabin and advanced safety features, it guarantees a comfortable journey for all passengers, making it an excellent choice for both short and long trips.",
      
      "Choose the Toyota Crysta for a premium experience. With its elegant design, spacious interiors, and advanced technologies, it combines luxury and reliability for all your travel needs."
    ]);
    
    
    
    setIsSuggestionsVisible(true);
  };

  const handleCookieReject = async () => {
    const id = Date.now().toString();
    setShowCookieConsent(false);
    await addDoc(collection(db, "cookieConsents"),
      {
      id: id,
      consent: "rejected",
      timestamp: new Date(),
    });
  };

  return (
    <Wrapper className={` ${search && !confirm ? "p-2 h-screen md:flex-row gap-2" : "p-0 h-auto"}`}>
      {!confirm && (
        <>
          <div id="scroll" className={`flex flex-col flex-1 gap-8  ${search ? "border rounded-xl" : ""} order-1 md:-order-1 border-gray-600 `}>
            {!search && (
              <>
                <div className="h-screen  flex flex-col">
                  <Navbar/>
                  <div className="h-full w-full flex-1 flex items-center justify-center p-2 md:p-4 ">
                    <div className="flex h-full bg rounded-lg w-full flex-col items-center justify-center md:flex-row gap-4 sm:gap-4 sm:p-4 p-2 ">
                      <div id="homePage" className="order-1 md:-order-1 flex flex-col gap-6 justify-center items-center w-full md:w-3/6">
                        <Header>
                          <UberLogo className="text-center">Rent. Explore. Thrive.</UberLogo>
                        </Header>
                        <Header className="flex flex-col text-2xl font-semibold">
                          <h2 className="text-gray-100 text-center">press the button below to start booking your dream ride today<span className="text-white text-start">. Let the journey begin!</span></h2>
                        </Header>
                        
                        <ActionButton1
                          onClick={openPopup}
                          className="bg-[#0080FF] shadow-md"
                        >
                          <Text className="text-white text-2xl font-medium">
                            Get Started
                          </Text>
                          <div className="go flex-1 h-full"></div>
                        </ActionButton1>
                      </div>
                    </div>
                  </div>
                </div>
                <Footer/>
              </>
            )}
            {search && (
              <Search
                handleclick={handleclick}
                handleconfirm={handleconfirm}
                pickup={pickup}
                setPickup={setPickup}
                dropoff={dropoff}
                setDropoff={setDropoff}
                tripType={tripType}
                setTripType={setTripType}
                formType={formType}
                setFormType={setFormType}
                setDays={setDays}
                setPickupDate={setPickupDate}
                pickupDate={pickupDate}
                setPickupTime={setPickupTime}
                setPackage={setPackage}
              />
            )}
          </div>
          {search && (
            <Map
              pickupCoordinates={pickupCoordinates}
              dropoffCoordinates={dropoffCoordinates}
              Package={Package}
              formType={formType}
            />
          )}
        </>
      )}
      {confirm && (
        <Confirm
          pickupCoordinates={pickupCoordinates}
          dropoffCoordinates={dropoffCoordinates}
          handleconfirm={handleconfirm}
          pickup={pickup}
          dropoff={dropoff}
          tripType={tripType}
          pickupDate={pickupDate}
          pickupTime={pickupTime}
          days={days}
          formType={formType}
          Package={Package}
        />
      )}
      {showPopup && (
        <Popup>
          <div className="h-14 text-lg rounded-t-lg flex font-medium justify-center items-center text-white max-w-md  bg-[#0080FF] w-full md:w-5/6 ">
            <h2>Select a option</h2>
          </div>
          <PopupContent>
            <CloseButton onClick={closePopup}>
              <img className="h-4" src="https://img.icons8.com/?size=512&id=46&format=png" />
            </CloseButton>
            <ActionButtons className="items-center">
              <ActionButton
                className=""
                onClick={() => {
                  setFormType("OutStation");
                  handleclick();
                  closePopup();
                }}
              >
                <ActionButtonImg src="https://img.icons8.com/?size=512&id=GR0X8aZ3trYu&format=png" />
                <Text>OutStation</Text>
              </ActionButton>
              <ActionButton
                className=""
                onClick={() => {
                  setFormType("Local Transport");
                  handleclick();
                  closePopup();
                }}
              >
                <ActionButtonImg src="https://img.icons8.com/?size=512&id=fsoiqMUp0O4v&format=png" />
                <Text>Local Transport</Text>
              </ActionButton>
              <ActionButton
                className=""
                onClick={() => {
                  setFormType("Airport");
                  handleclick();
                  closePopup();
                }}
              >
                <ActionButtonImg src="https://img.icons8.com/?size=512&id=akvTP3kbVnLv&format=png" />
                <Text>Airport(Pickup / dropoff)</Text>
              </ActionButton>
            </ActionButtons>
          </PopupContent>
        </Popup>
      )}
      <FloatingCallButton className="FloatingCallButton">
        <Link href="tel:80109 55252">
          <FloatingCallIcon className="FloatingCallIcon" />
        </Link>
      </FloatingCallButton>
      <ToastContainer
        position="top-center"
        autoClose={false}
        draggablePercent={20}
        limit={1}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
      {showCookieConsent && <CookieConsent onAccept={handleCookieAccept} onReject={handleCookieReject} />}
      
      {isSuggestionsVisible && (
        <Suggestions 
          suggestions={suggestions} 
          onClose={() => setIsSuggestionsVisible(false)} 
        />
      )}
      
    </Wrapper>
  );
}
//{
const Wrapper = tw.div`
  flex flex-col bg-white
`;

const Header = tw.div`
  flex flex-col justify-between items-center 
`;
const UberLogo = tw.h1`
 text-[10.7vw] leading-[10.7vw]  md:text-[3.7vw] md:leading-[3.7vw] bold text-white
`;
const ActionButtons = tw.div`
  flex justify-center w-full flex-col gap-2
`;
const ActionButton = tw.button`
 flex w-full font-medium px-4 py-2 shadow-md text-base items-center h-16  justify-between rounded-lg transform hover:scale-105 transition border border-gray-400
`;
const ActionButton1 = tw.button`
 flex w-4/6 md:w-3/6 font-medium px-4 py-2 shadow-md text-base items-center h-14  justify-between rounded-lg transform hover:scale-105 transition 
`;
const Text = tw.span`text-start w-5/6`;
const ActionButtonImg = tw.img`
  h-10 
`;
const InputButton = tw.div`
  h-12 bg-gray-200 text-2xl p-4 flex items-center mt-5 rounded-lg border border-gray-300 font-medium mx-2
`;
const Popup = tw.div`
  fixed top-0 left-0 right-0 bottom-0 flex items-center flex-col justify-center bg-black bg-opacity-50 p-2 z-10 text-black
`;

const PopupContent = tw.div`
  bg-white rounded-b-lg max-w-md w-full md:w-5/6 py-6 flex justify-center items-center flex-col px-2
`;

const CloseButton = tw.button`
  absolute top-4 right-4 p-2 rounded-full bg-white text-black
`;

const FloatingCallButton = tw.div`
md:hidden borber borber-gray-500 flex fixed bottom-6 right-6 p-4 bg-blue-700 rounded-full shadow-lg items-center gap-2 text-white transition-all duration-300
`;

const FloatingCallIcon = tw(BsFillTelephoneFill)`
  text-2xl
`;

//}
