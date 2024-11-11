import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import geocoding from "@mapbox/mapbox-sdk/services/geocoding";
import { MdDateRange } from "react-icons/md";
import {  MdLocationOn } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";
function Search({
  handleclick,
  handleconfirm,
  pickup,
  setPickup,
  dropoff,
  setDropoff,
  tripType,
  setTripType,
  formType,
  setFormType,
  setPickupDate,
  pickupDate,
  setPickupTime,
  setPackage,
  setDays,
}) {
  const geocodingService = new geocoding({
    accessToken:
      "pk.eyJ1IjoiZ29kaGEiLCJhIjoiY2xpZTh3ZWdoMDhkajNlcGRpZ3l0dTllOSJ9.uaD7_LAOgpJTzlhlRf9u9g",
  });

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [currentLocation, setCurrentLocation] = useState("");
  const fetchSuggestions = async (input, setter) => {
    try {
      const response = await geocodingService
        .forwardGeocode({
          query: input,
          limit: 5,
        })
        .send();

      const suggestions = response.body.features.map(
        (feature) => feature.place_name
      );
      setter(suggestions);
    } catch (error) {
      console.log("Error fetching suggestions:", error);
    }
  };

  useEffect(() => {
    if (pickup) {
      fetchSuggestions(pickup, setPickupSuggestions);
    }
  }, [pickup]);

  useEffect(() => {
    if (dropoff) {
      fetchSuggestions(dropoff, setDropoffSuggestions);
    }
  }, [dropoff]);

  const handleTripTypeChange = (event) => {
    setTripType(event.target.value);
  };
  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const getUserCurrentLocation = () => {
    const confirmAccess = window.confirm(
      "This website wants to access your current location. Allow access?"
    );
  
    if (confirmAccess) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            // Use Mapbox's reverse geocoding to get the location name from latitude and longitude
            geocodingService
              .reverseGeocode({
                query: [longitude, latitude],
                limit: 1,
              })
              .send()
              .then((response) => {
                const locationName =
                  response.body.features[0].place_name || "Unknown Location";
                setCurrentLocation(locationName);
                setPickup(locationName);
              })
              .catch((error) => {
                console.log("Error fetching current location:", error);
              });
          },
          (error) => {
            console.log("Error getting current location:", error);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    } else {
      console.log("User denied access to current location.");
    }
  };

  return (
    <Wapper>
      <ButtonContainer>
        <Back
          src="https://img.icons8.com/ios-filled/50/000000/left.png"
          onClick={() => {
            setFormType(0);
            setDropoff("");
            setPickup("");
            handleclick();
          }}
        />
      </ButtonContainer>
      <InputContainer onSubmit={handleconfirm}>
        {formType == "OutStation" && (
          <InputBoxes>
          <div className="flex gap-2">
            <Input
              placeholder="Enter pickup location"
              className="flex-1"
              value={pickup}
              autoComplete="address-line1"
              list="pickup-suggestions"
              onChange={(e) => setPickup(e.target.value)}
              required
            />
             <button
                type="button"
                onClick={getUserCurrentLocation}
                className="bg-blue-500 text-lg text-white px-4 py-2 rounded-md border border-gray-400"
              >
               < MdLocationOn/>
              </button></div>
            <datalist id="pickup-suggestions">
              {pickupSuggestions.map((suggestion, index) => (
                <option key={index} value={suggestion} />
              ))}
            </datalist>

            <Input
              placeholder="Where to?"
              value={dropoff}
              autoComplete="off"
              list="dropoff-suggestions"
              onChange={(e) => setDropoff(e.target.value)}
              required
            />
           
            <datalist id="dropoff-suggestions">
              {dropoffSuggestions.map((suggestion, index) => (
                <option key={index} value={suggestion} />
              ))}
            </datalist>

            <div className="flex  rounded-md items-center justify-between gap-2">
              <div className="flex flex-1 btn1 p-2  rounded-md items-center justify-center gap-10">
                <label
                  htmlFor="OneWay"
                  className="text-black flex items-center gap-2"
                >
                  One Way
                  <input
                    type="radio"
                    id="OneWay"
                    name="radio"
                    value="One Way"
                    checked={tripType === "One Way"}
                    onChange={handleTripTypeChange}
                    required
                  />
                </label>
              </div>
              <div className="flex flex-1 btn1 p-2  rounded-md items-center justify-center gap-10">
                <label
                  htmlFor="RoundTrip"
                  className="text-black flex items-center gap-2"
                >
                  Round Trip
                  <input
                    type="radio"
                    id="RoundTrip"
                    name="radio"
                    value="Round Trip"
                    checked={tripType === "Round Trip"}
                    onChange={handleTripTypeChange}
                    required
                  />
                </label>
              </div>
            </div>

            {tripType === "Round Trip" && (
              <div className="flex gap-6 btn1 p-2  rounded-md h-12 items-center">
                <select
                  name="days"
                  className="form-control bg-[#f5f5f5] text-black w-full"
                  id="duration"
                  onChange={(e) => setDays(e.target.value)}
                  required
                >
                  <option value="0">Select Number of days</option>
                  <option value="1">Full Day</option>
                  <option value="2">2 Days</option>
                  <option value="3">3 Days</option>
                  <option value="4">4 Days</option>
                  <option value="5">5 Days</option>
                  <option value="6">6 Days</option>
                  <option value="7">7 Days</option>
                  <option value="8">8 Days</option>
                  <option value="9">9 Days</option>
                  <option value="10">10 Days</option>
                </select>
              </div>
            )}
            <div className="flex  rounded-md items-center justify-between gap-2">
              <div className="flex flex-1 btn1 p-2  rounded-md items-center justify-between gap-2">
                <MdDateRange size="20" />
                <input
                  className="bg-[#f5f5f5] text-black w-full"
                  placeholder="Pickup date"
                  name="Pickdate"
                  type="date"
                  value={pickupDate || getCurrentDate()} // Set initial value to current date
                  onChange={(e) => {
                    setPickupDate(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="flex flex-1 btn1 p-2  rounded-md items-center justify-between gap-2">
                <BiTimeFive size="20" />
                <input
                  name="pickup_time"
                  onChange={(e) => {
                    setPickupTime(e.target.value);
                  }}
                  type="time"
                  className="bg-[#f5f5f5] text-black w-full"
                  id="time_picker1"
                  required
                />
              </div>
            </div>
          </InputBoxes>
        )}
        {formType == "Local Transport" && (
          <InputBoxes>
          <div className="flex gap-2">
            <Input
              placeholder="Enter pickup location"
              className="flex-1"
              value={pickup}
              autoComplete="address-line1"
              list="pickup-suggestions"
              onChange={(e) => setPickup(e.target.value)}
              required
            />
             <button
                type="button"
                onClick={getUserCurrentLocation}
                className="bg-blue-500 text-lg text-white px-4 py-2 rounded-md border border-gray-400"
              >
               < MdLocationOn/>
              </button></div>
            <datalist id="pickup-suggestions">
              {pickupSuggestions.map((suggestion, index) => (
                <option key={index} value={suggestion} />
              ))}
            </datalist>

            <div className="flex gap-6 btn1 p-2  rounded-md h-12 items-center">
              <select
                className="form-control bg-[#f5f5f5] w-full"
                name="trip_package"
                id="trip_package"
                onChange={(e) => setPackage(e.target.value)}
                required
              >
                <option value="">Select Package</option>
                <option value="8|80">8 Hr/ 80 Kilometer</option>
              </select>
            </div>

            <div className="flex  rounded-md items-center justify-between gap-2">
              <div className="flex flex-1 btn1 p-2  rounded-md items-center justify-between gap-2">
                <MdDateRange size="20" />
                <input
                  className="bg-[#f5f5f5] text-black w-full"
                  placeholder="Pickup date"
                  name="Pickdate"
                  type="date"
                  value={pickupDate || getCurrentDate()} // Set initial value to current date
                  onChange={(e) => {
                    setPickupDate(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="flex flex-1 btn1 p-2  rounded-md items-center justify-between gap-2">
                <BiTimeFive size="20" />
                <input
                  name="pickup_time"
                  onChange={(e) => {
                    setPickupTime(e.target.value);
                  }}
                  type="time"
                  className="bg-[#f5f5f5] text-black w-full"
                  id="time_picker1"
                  required
                />
              </div>
            </div>
          </InputBoxes>
        )}
        {formType == "Airport" && (
          <InputBoxes>
            <div className="flex rounded-md items-center justify-start gap-2">
              <div className="flex flex-1 btn1 p-2  rounded-md items-center justify-center gap-10">
                <label
                  htmlFor="Drop at Airport"
                  className="text-black flex items-center gap-2"
                >
                  Drop at Airport
                  <input
                    type="radio"
                    id="Drop at Airport"
                    name="radio"
                    value="Drop at Airport"
                    checked={tripType === "Drop at Airport"}
                    onChange={(e) => {
                      handleTripTypeChange(e);
                      setPickup("");
                      setDropoff("");
                    }}
                    required
                  />
                </label>
              </div>
              <div className="flex flex-1 btn1 p-2  rounded-md items-center justify-center gap-10">
                <label
                  htmlFor="Pickup from Airport"
                  className="text-black flex items-center gap-2"
                >
                  Pickup from Airport
                  <input
                    type="radio"
                    id="Pickup from Airport"
                    name="radio"
                    value="Pickup from Airport"
                    checked={tripType === "Pickup from Airport"}
                    onChange={(e) => {
                      handleTripTypeChange(e);
                      setPickup("");
                      setDropoff("");
                    }}
                    required
                  />
                </label>
              </div>
            </div>
            {tripType === "Drop at Airport" && (
              <>
          <div className="flex gap-2">
            <Input
              placeholder="Enter pickup location"
              className="flex-1"
              value={pickup}
              autoComplete="address-line1"
              list="pickup-suggestions"
              onChange={(e) => setPickup(e.target.value)}
              required
            />
             <button
                type="button"
                onClick={getUserCurrentLocation}
                className="bg-blue-500 text-lg text-white px-4 py-2 rounded-md border border-gray-400"
              >
               < MdLocationOn/>
              </button></div>
                <datalist id="pickup-suggestions">
                  {pickupSuggestions.map((suggestion, index) => (
                    <option key={index} value={suggestion} />
                  ))}
                </datalist>

                <div className="flex gap-6 btn1 p-2  rounded-md h-12 items-center">
                  <select
                    name="airport_name"
                    id="airport_name"
                    required
                    className="form-control bg-[#f5f5f5] text-black w-full"
                    onChange={(e) => setDropoff(e.target.value)}
                  >
                    <option value="">Select Dropoff location</option>
                    <option value="MUMBAI INTERNATIONAL AIRPORT">
                      MUMBAI INTERNATIONAL AIRPORT.TERMINAL - 2
                    </option>
                    <option value="DOMESTIC AIRPORT MUMBAI">
                      DOMESTIC AIRPORT MUMBAI 1 - A
                    </option>
                  </select>
                </div>
              </>
            )}
            {tripType === "Pickup from Airport" && (
              <>
                <div className="flex gap-6 btn1 p-2  rounded-md h-12 items-center">
                  <select
                    name="airport_name"
                    id="airport_name"
                    required
                    className="form-control bg-[#f5f5f5] text-black w-full"
                    onChange={(e) => setPickup(e.target.value)}
                  >
                    <option value="">Select Pickup location</option>
                    <option value="MUMBAI INTERNATIONAL AIRPORT">
                      MUMBAI INTERNATIONAL AIRPORT.TERMINAL - 2
                    </option>
                    <option value="DOMESTIC AIRPORT MUMBAI">
                      DOMESTIC AIRPORT MUMBAI 1 - A
                    </option>
                  </select>
                </div>
                <Input
                  placeholder="Enter location"
                  value={dropoff}
                  autoComplete="address-line1"
                  list="pickup-suggestions"
                  onChange={(e) => setDropoff(e.target.value)}
                  required
                />
                <datalist id="pickup-suggestions">
                  {pickupSuggestions.map((suggestion, index) => (
                    <option key={index} value={suggestion} />
                  ))}
                </datalist>
              </>
            )}
            <div className="flex gap-6 btn1 p-2  rounded-md h-12 items-center">
              <select
                className="form-control bg-[#f5f5f5] w-full"
                name="trip_package"
                id="trip_package"
                required
              >
                <option value="">Select Package</option>
                <option value="6|60">4 Hr/ 40 Kilometer</option>
              </select>
            </div>
            <div className="flex  rounded-md items-center justify-between gap-2">
              <div className="flex flex-1 btn1 p-2  rounded-md items-center justify-between gap-2">
                <MdDateRange size="20" />
                <input
                  className="bg-[#f5f5f5] text-black w-full"
                  placeholder="Pickup date"
                  name="Pickdate"
                  type="date"
                  value={pickupDate || getCurrentDate()} // Set initial value to current date
                  onChange={(e) => {
                    setPickupDate(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="flex flex-1 btn1 p-2  rounded-md items-center justify-between gap-2">
                <BiTimeFive size="20" />
                <input
                  name="pickup_time"
                  onChange={(e) => {
                    setPickupTime(e.target.value);
                  }}
                  type="time"
                  className="bg-[#f5f5f5] text-black w-full"
                  id="time_picker1"
                  required
                />
              </div>
            </div>
          </InputBoxes>
        )}
        <ConfirmBtn type="submit" value="Confirm Location" />
      </InputContainer>
    </Wapper>
  );
}
export default Search;

const Wapper = tw.div`
flex flex-col flex-1 justify-start p-2
`;
const ButtonContainer = tw.div`
 border-b py-2 mb-2
`;
const Back = tw.img`
h-8 cursor-pointer 
`;
const InputContainer = tw.form`
 flex mb-2 border-b flex-col w-full gap-2 text-sm
`;
const InputBoxes = tw.div`
flex flex-col flex-1 gap-2
`;
const Input = tw.input`
h-12 btn1 rounded-md p-2 outline-none borber-none
`;

const ConfirmBtn = tw.input`
bg-[#0080ff]  text-white py-3 shadow-md text-center text-lg cursor-pointer rounded-md font-medium
`;
