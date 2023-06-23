import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillTwitterSquare,
  AiFillYoutube,
} from "react-icons/ai";
import {
  footerProductLinks,
  footerSupportLinks,
  footercompanyLinks,
} from "../../staticData/data";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="bg-[#041C32]  text-white">
     

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:px-8 px-4 py-16 sm:text-center ">
        <ul className="px-5 text-center sm:text-start flex sm:block fle-col flex-col items-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/011/996/555/original/3d-black-headphone-illustration-ecommerce-icon-png.png"
            alt=""
            className="w-[100px] h-[70px] "
          />
          <br />
          <p>The home and elements needed to create beautiful</p>
          <div className="flex items-center mt-[15px] ">
            <AiFillFacebook size={25} className="cursor-pointer" />
            <AiFillInstagram
              size={25}
              style={{marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillTwitterCircle
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillYoutube
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            {/* <AiFillInstagram size={25} style={{marginLeft:"15px", cursor:"pointer"}}/> */}
          </div>
        </ul>

        <ul className="text-center sm:text-start  pl-8  md:pl-0">
          <h1 className="md-1 font-semibold text-[23px] "> Company </h1>
          {footerProductLinks.map((link) => {
            return (
              <li key={link.name} className="pl-3  ">
                <Link
                  to={link.link}
                  className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6 text-[17px]"
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <ul className="text-center sm:text-start  pl-8  md:pl-0">
          <h1 className="md-1 font-semibold text-[23px] "> Company </h1>
          {footercompanyLinks.map((link) => {
            return (
              <li key={link.name} className="pl-3  ">
                <Link
                  to={link.link}
                  className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6 text-[17px]"
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <ul className="text-center sm:text-start  pl-8  md:pl-0">
          <h1 className="md-1 font-semibold text-[23px] "> Support </h1>
          {footercompanyLinks.map((link) => {
            return (
              <li key={link.name} className="pl-3  ">
                <Link
                  to={link.link}
                  className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6 text-[17px]"
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8">
        <span>2023 hasan, all rights reserved</span>
        <span> terms @ Privacy Policy</span>
      </div>
    </div>
  );
}

export default Footer;
