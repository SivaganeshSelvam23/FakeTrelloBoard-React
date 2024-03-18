import React from "react";
import { FaTrello } from "react-icons/fa";
const Header = () => {
  return (
    <div className="bg-blue-900 w-auto h-16 flex items-center pl-5 ">
      <div className="flex gap-4 items-center">
        <FaTrello size={25} />
        <span className="text-[25px] font-extrabold ">Fake Trello Board</span>
      </div>
    </div>
  );
};

export default Header;
