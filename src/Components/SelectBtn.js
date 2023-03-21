import React from "react";

function SelectBtn({ children, onClick, selected }) {
  return (
    <span
      onClick={onClick}
      className={`text-center border border-solid border-primary rounded-md px-5 py-3 cursor-pointer ${
        selected ? "bg-primary" : "bg-inherit"
      } ${selected ? "font-bold" : "font-medium"} ${
        selected ? "text-darkerBgColor" : "text-white"
      } hover:bg-primary hover:text-darkerBgColor w-1/4`}
    >
      {children}
    </span>
  );
}

export default SelectBtn;
