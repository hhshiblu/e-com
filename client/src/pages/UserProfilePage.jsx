import React, {  useState } from "react";


import ProfileSideBar from "../component/Profile/ProfileSideBar.jsx";
import ProfileContent from "../component/Profile/ProfileContent.jsx";
import Header from "../component/Layout/Header";
import styles from "../styles/style.js";
// import { useSelector } from "react-redux";

const ProfilePage = () => {
//   const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  return (
    <div>
      {/* {loading ? (
        <Loader />
      ) : ( */}
        <>
          <Header />
          <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
            <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[5%] md:mt-[10%] ">
              <ProfileSideBar active={active} setActive={setActive} />
            </div>
          
            <ProfileContent active={active} />
           

          </div>
        </>
      {/* )} */}
    </div>
  );
};

export default ProfilePage;
