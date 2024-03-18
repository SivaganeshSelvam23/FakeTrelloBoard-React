import React from "react";
import { IoClose } from "react-icons/io5";
const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="w-[800px] h-auto flex justify-between bg-black border-green-700 border-4 p-8 rounded-lg shadow-lg text-black">
        {children}
        <div
          className="w-[25px] text-green-500 cursor-pointer h-[25px]"
          onClick={onClose}
        >
          <IoClose size={25} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
