import React from "react";

import "./Header.css";
import Search from "./Search";

function Header({ activeHeading }) {
  return (
    <div>
      <Search activeHeading={activeHeading} />
    </div>
  );
}

export default Header;
