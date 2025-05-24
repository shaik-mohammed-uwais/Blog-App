import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo, Button, Input } from "./export";
import authservices from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "../store/authslice";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authservices.createAccount(data);
      if (userData) {
        const currentUser = await authservices.getCurrentuser();
        if (currentUser) {
          dispatch(login(currentUser));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all">
      {/* <div className="flex justify-center mb-6">
        <span className="inline-block w-24">
          <Logo width="100%" />
        </span>
      </div> */}

      <h2 className="text-center text-2xl font-bold text-gray-900">
        Create your account
      </h2>
      <p className="text-center text-sm text-gray-600 mt-1">
        Already registered?{" "}
        <Link
          to="/login"
          className="text-black underline underline-offset-2 hover:text-blue-600"
        >
          login
        </Link>
      </p>

      {error && (
        <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
      )}

      <form onSubmit={handleSubmit(create)} className="mt-6 space-y-4">
        <Input
          label="Full Name"
          placeholder="Jane Doe"
          {...register("name", { required: "Full name is required" })}
          className={errors.name ? "border-red-500" : ""}
        />
        <Input
          label="Email"
          placeholder="you@example.com"
          type="email"
          {...register("email", {
            required: "Email is required",
            validate: {
              matchPattern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Enter a valid email",
            },
          })}
          className={errors.email ? "border-red-500" : ""}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          {...register("password", {
            required: "Password is required",
          })}
          className={errors.password ? "border-red-500" : ""}
        />
        <Button type="submit" className="w-full">
          Sign up
        </Button>
      </form>
    </div>
  );
}

export default Signup;
