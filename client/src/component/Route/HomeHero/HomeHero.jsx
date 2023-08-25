import React from "react";
import HomeSlider from "./HomeSlider.jsx";
function HomeHero() {
  return (
    <div>
      <div className={` lg:max-w-[1024px] md:min-h-[cale(100vh_-_400px)] min-h-[cale(100vh_-_250px)] m-auto p-6 rounded-lg mb-12 `}>
        <div className="  flex flex-col gap-4 overflow-hidden lg:flex-row ">
          {/* --------- slider ---------- */}

          <div className="w-full  relative  md:w-[80%]   mx-auto   border-2 rounded-xl   shadow-sm  cursor-pointer overflow-hidden ">
            <HomeSlider/>
            </div>
          {/* ---------------------coming event--------------- */} 

         <div className="w-full md:w-[80%] mx-auto p-2 md:p-2  rounded-xl bg-gray-200 lg:w-[350px] lg:aspect-square">
            <h3 className="font-medium text-xm md:text-base  ">
              Upcoming items
            </h3>
          
            {/* <ul className="gap-4 flex lg:flex-col mt-4 hide-scrollbar overflow-y-auto lg:max-h-[267px] xl:max-h-[267px] ">
              <li>
                <div className="h-full flex p-4 bg-white rounded-xl  min-w-[248px]">
                  <div className="flex-1">
                    <div>
                      <img
                        alt="happy hour"
                        loading="lazy"
                        width="320"
                        height="121"
                        decoding="async"
                        data-nimg="1"
                        className="mx-auto  transition-opacity duration-300 ease-in-out  opacity-100  w-full ml-0 mr-0 "
                        src="https://evaly.com.bd/web-static/images/happyhour.png"
                        style={{"color": "transparent"}}
                      />
                    </div>
                    <p className="mb-1 text-sm font-semibold text-center">
                      Campaign starts in
                    </p>
                  </div>Name
                  <div className="h-full flex-1">
                    <div className="items-center gap-2 grid grid-cols-2 ">
                      <p className="w-full py-1.5 md:py-2 text-base md:text-lg h-full px-1 text-center font-bold bg-black rounded  text-white">
                        2d
                      </p>
                      <p className="w-full py-1.5 md:py-2 text-base md:text-lg h-full px-1 text-center font-bold bg-black rounded text-white">
                        7h
                      </p>
                      <p className="w-full py-1.5 md:py-2 text-base md:text-lg h-full px-1 text-center font-bold bg-black rounded text-white">
                        2m
                      </p>
                      <p className="w-full py-1.5 md:py-2 text-base md:text-lg h-full px-1 text-center font-bold bg-black rounded text-white">
                        35s
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="h-full flex p-4 bg-white rounded-xl  min-w-[248px]">
                  <div className="flex-1">
                    <div>
                      <img
                        alt="happy hour"
                        loading="lazy"
                        width="320"
                        height="121"
                        decoding="async"
                        data-nimg="1"
                        className="mx-auto  transition-opacity duration-300 ease-in-out  opacity-100  w-full ml-0 mr-0 "
                        src="https://evaly.com.bd/web-static/images/happyhour.png"
                        style={{"color": "transparent"}}
                      />
                    </div>
                    <p className="mb-1 text-sm font-semibold text-center">
                      Campaign starts in
                    </p>
                  </div>
                  <div className="h-full flex-1">
                    <div className="items-center gap-2 grid grid-cols-2 ">
                      <p className="w-full py-1.5 md:py-2 text-base md:text-lg h-full px-1 text-center font-bold bg-black rounded  text-white">
                        2d
                      </p>
                      <p className="w-full py-1.5 md:py-2 text-base md:text-lg h-full px-1 text-center font-bold bg-black rounded text-white">
                        7h
                      </p>
                      <p className="w-full py-1.5 md:py-2 text-base md:text-lg h-full px-1 text-center font-bold bg-black rounded text-white">
                        2m
                      </p>
                      <p className="w-full py-1.5 md:py-2 text-base md:text-lg h-full px-1 text-center font-bold bg-black rounded text-white">
                        35s
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="h-full flex p-4 bg-white rounded-xl  min-w-[248px]">
                  <div className="flex-1">
                    <div>
                      <img
                        alt="happy hour"
                        loading="lazy"
                        width="320"
                        height="121"
                        decoding="async"
                        data-nimg="1"
                        className="mx-auto  transition-opacity duration-300 ease-in-out  opacity-100  w-full ml-0 mr-0 "
                        src="https://evaly.com.bd/web-static/images/happyhour.png"
                        style={{"color": "transparent"}}
                      />
                    </div>
                    <p className="mb-1 text-sm font-semibold text-center">
                      Campaign starts in
                    </p>
                  </div>
                  <div className="h-full flex-1">
                    <div className="items-center gap-2 grid grid-cols-2 ">
                      <p className="w-full py-1.5 md:py-2 text-base md:text-lg h-full px-1 text-center font-bold bg-black rounded  text-white">
                        2d
                      </p>
                      <p className="w-full py-1.5 md:py-2 text-base md:text-lg h-full px-1 text-center font-bold bg-black rounded text-white">
                        7h
                      </p>
                      <p className="w-full py-1.5 md:py-2 text-base md:text-lg h-full px-1 text-center font-bold bg-black rounded text-white">
                        2m
                      </p>
                      <p className="w-full py-1.5 md:py-2 text-base md:text-lg h-full px-1 text-center font-bold bg-black rounded text-white">
                        35s
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              
            </ul>{" "} */}
          </div> 
        </div>
      </div>
    </div>
  );
}

export default HomeHero;
