import React from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();

  const logoutFunc = () => {
    localStorage.removeItem("token");
    window.location = "/auth";
  };

  const openModal = () => {
    dispatch({ type: "MODAL", payload: true });
  };
  return (
    <div className="h-20 bg-indigo-500 text-white flex items-center justify-between px-4">
      <div className="text-white font-bold text-2xl cursor-pointer">
        POST PAYLAŞ
      </div>
      <div className="flex items-center space-x-5">
        <input
          type="text"
          placeholder="Ara..."
          className="p-2 outline-none rounded-md "
        />
        <div
          onClick={openModal}
          className="w-36 border p-2 rounded-md text-center text-white cursor-pointer hover:bg-indigo-800"
        >
          Post Oluştur
        </div>
        <RiLogoutBoxLine
          onClick={logoutFunc}
          className="w-8 h-8 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;
