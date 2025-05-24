import React from "react";
import { Signup } from "../components/export";

function Signuppage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 px-2">
      <div className="w-full max-w-md p-4 bg-white shadow-sm rounded-xl border border-gray-200">
        <Signup />
      </div>
    </div>
  );
}

export default Signuppage;
