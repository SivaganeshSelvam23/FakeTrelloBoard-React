import React from "react";
import { MdMoreVert } from "react-icons/md";
const CardsList = ({ item }) => {
  return (
    <div className="h-fill w-fill bg-purple-900 p-5  rounded-lg flex justify-between">
      <span className="cursor-pointer">{item.projectTitle}</span>
      <MdMoreVert size={25} className="cursor-pointer" />
    </div>
  );
};

export default CardsList;
