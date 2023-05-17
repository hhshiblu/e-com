import React, { useState } from "react";

import "./Header.css";
import Head from "./Head";
import Search from "./Search";

function Header({ activeHeading }) {
  return (
    <div>
      <Head />
      <Search activeHeading={activeHeading} />
    </div>
  );
}

export default Header;
