import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function about() {
  return (
    <>
      <Navbar />
      <main className="profile-page">
        <section className="relative block" style={{ height: "500px" }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/1552224/pexels-photo-1552224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-20 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-gray-300">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-2 md:px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative h-[100px] w-[100px] ">
                      <div className="h-[100px] w-[100px] flex items-center justify-center md:h-[150px] md:w-[150px] shadow-xl bg-white rounded-full  align-middle border-none absolute -top-12 ">
                        <img
                          alt="..."
                          src="Pogo.png"
                          className="w-24 h-auto rounded"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center hidden md:block">
                    <div className="px-3 mt-32 sm:mt-0"></div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1 "></div>
                </div>
                <section class="text-gray-600 body-font">
                  <div class="container px-5 py-12 md:py-16 mx-auto">
                    <div class="flex flex-wrap -m-4 text-center">
                      <div class="p-4 sm:w-1/4 w-1/2">
                        <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                          100+
                        </h2>
                        <p class="leading-relaxed">Customers</p>
                      </div>
                      <div class="p-4 sm:w-1/4 w-1/2">
                        <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                          180+ Countries
                        </h2>
                        <p class="leading-relaxed">Locations</p>
                      </div>
                      <div class="p-4 sm:w-1/4 w-1/2">
                        <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                          5.0
                        </h2>
                        <p class="leading-relaxed">Rating</p>
                      </div>
                      <div class="p-4 sm:w-1/4 w-1/2">
                        <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                          4
                        </h2>
                        <p class="leading-relaxed">Cars</p>
                      </div>
                    </div>
                  </div>
                </section>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800">
                    Rent Ease
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>
                    Borivali West
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-1 md:px-4">
                      <p className="mb-4 text-lg leading-relaxed text-gray-800">
                        <span className="font-black text-black">Welcome to RENT EASE - Your Car Rental Solution </span>
                        This project, crafted as part of our Semester 5 curriculum, was made possible through the invaluable guidance and mentorship of Professor <span className="font-black text-black">Shamsuddin Khan</span> and Professor <span className="font-black text-black"> Pradhnya Pradhan</span>. Their expertise and support helped us bring this platform to life, ensuring a seamless and efficient car rental experience for users.Since its inception, RENTEASE has been designed to set new standards in the industry by providing instant booking confirmations and prioritizing client satisfaction. Our project reflects our dedication to innovative solutions and our commitment to excellence, aiming to create a smooth travel experience. Join a growing community of satisfied travelers and explore the difference. For us, it’s not just about renting a car; it's about enhancing every journey and creating unforgettable memories. Contact us today and let us be part of your next adventure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default about;
