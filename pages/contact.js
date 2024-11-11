import Link from "next/link";
import React, { useState } from "react";
import tw from "tailwind-styled-components";
import Map from "../components/Map";

const Contact = () => {
  const [Package, setPackage] = useState("");
  const [pickupCoordinates, setpickupCoordinates] = useState([0, 0]);
  const [dropoffCoordinates, setdropoffCoordinates] = useState([0, 0]);
  const [formType, setFormType] = useState("");

  return (
    <div className="flex flex-col h-screen w-full">
      <Buttoncon>
        <Link href="/">
          <Back src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </Link>
      </Buttoncon>
      <div className="flex-1 h-full w-full flex justify-center items-center">
        <Map
          pickupCoordinates={pickupCoordinates}
          dropoffCoordinates={dropoffCoordinates}
          Package={Package}
          formType={formType}
        />
      </div>
      <div className="flex-[2_2_0%] flex flex-col md:flex-row md:flex-1 h-full">
        <div className="flex-1 h-full bg-[#232323] text-white p-6">
          <h2 className="text-4xl md:text-6xl text-center font-bold">Meet Us</h2>
          <div className="flex flex-col gap-2 justify-center items-center mt-6">
            <h3 className="text-xl md:text-2xl font-bold">Address:</h3>
            <p className="text-lg md:text-xl font-medium text-center w-5/6">
              123, Sunshine Apartments, Hill Road, Bandra West, Mumbai - 400050,
              Maharashtra, India
            </p>
          </div>
          {/* LinkedIn Links */}
          <div className="flex flex-col gap-4 justify-center items-center mt-8">
            <h3 className="text-2xl md:text-3xl font-bold">Connect with Us:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* LinkedIn profile icons only */}
              <div className="flex items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/siyan-pereira-33017b244"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                    alt="LinkedIn"
                    className="w-8 h-8"
                  />
                </a>
                <span className="text-lg md:text-xl font-medium text-gray-300">Siyan Pereira</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/ansley-rebello-183838244"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                    alt="LinkedIn"
                    className="w-8 h-8"
                  />
                </a>
                <span className="text-lg md:text-xl font-medium text-gray-300">Ansley Rebello</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/narous-lopes-7453b0244"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                    alt="LinkedIn"
                    className="w-8 h-8"
                  />
                </a>
                <span className="text-lg md:text-xl font-medium text-gray-300">Narous Lopes</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.linkedin.com/in/glaxson-rebello-46ba81286"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                    alt="LinkedIn"
                    className="w-8 h-8"
                  />
                </a>
                <span className="text-lg md:text-xl font-medium text-gray-300">Glaxson Rebello</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 h-full p-6">
          <h2 className="text-4xl md:text-6xl text-center font-bold">Call Us</h2>
          <div className="flex gap-4 justify-center items-center mt-4">
            <h2 className="text-xl md:text-2xl font-bold">Hours:</h2>
            <p className="text-xl md:text-2xl font-medium text-center">Open 24 hours</p>
          </div>
          <div className="flex gap-4 justify-center items-center mt-4">
            <h2 className="text-xl md:text-2xl font-bold">Phone:</h2>
            <p className="text-xl md:text-2xl font-medium text-center">80109 55252</p>
          </div>
          <div className="flex gap-4 justify-center items-center mt-4">
            <h2 className="text-xl md:text-2xl font-bold">Email:</h2>
            <p className="text-xl md:text-2xl font-medium text-center">rentease573@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

const Back = tw.img`
h-8 cursor-pointer 
`;
const Buttoncon = tw.div`
flex w-8 rounded-full bg-white fixed z-10 m-2 shadow-md cursor-pointer
`;
