import React from "react";
import { useDispatch } from "react-redux";
import authservices from "../../appwrite/auth";
import { logout } from "../../store/authslice";
import { LogOut } from "lucide-react";

function Logout() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authservices.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      onClick={logoutHandler}
      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-700 hover:text-white hover:bg-red-600 rounded-md transition-all duration-200"
    >
      <LogOut size={16} />
      Logout
    </button>
  );
}

export default Logout;
