import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "./export";
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
    <div className="w-full max-w-md bg-white/30 backdrop-blur-md rounded-2xl px-8 py-10 shadow-md hover:shadow-lg transition-all border border-white/20">
      <h2 className="text-center text-2xl font-bold text-gray-900">
        Create your account
      </h2>
      <p className="text-center text-sm text-gray-700 mt-1">
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
       
        <Button
        type="submit"
        className="w-full px-3 py-2 
          text-blue-900 !text-blue-900 font-semibold 
          bg-blue-300/40 backdrop-blur-md 
          border border-white/30 rounded-lg 
          shadow-sm hover:shadow-md 
          hover:bg-blue-400/50 
          transition duration-200"
      >
        Sign up
      </Button>
      </form>
    </div>
  );
}

export default Signup;
