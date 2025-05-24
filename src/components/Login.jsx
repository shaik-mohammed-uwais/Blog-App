import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as storeLogin } from "../store/authslice";
import { Logo, Button, Input } from "./export";
import authservices from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const login = async (data) => {
    setError("");
    try {
      const session = await authservices.login(data);
      if (session && session.$id) {
        dispatch(storeLogin({ userdata: session }));
        navigate("/");
      } else {
        throw new Error("Failed to authenticate user");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md border border-gray-200 rounded-xl p-8 shadow-sm transition-all hover:shadow-md">
        {/* <div className="flex justify-center mb-6">
          <span className="inline-block w-24 transition-transform hover:scale-105">
            <Logo width="100%" />
          </span>
        </div> */}
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Welcome back
        </h2>
        <p className="text-center text-sm text-gray-600 mt-1">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-black underline underline-offset-2 hover:text-blue-600"
          >
            Sign up
          </Link>
        </p>

        {error && (
          <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit(login)} className="mt-6 space-y-4">
          <Input
            label="Email"
            placeholder="you@example.com"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          <Input
            label="Password"
            placeholder="••••••••"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
