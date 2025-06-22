import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login as storeLogin } from "../store/authslice";
import { Button, Input } from "./export";
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
      <div className="w-full max-w-md border border-white/20 bg-white/30 backdrop-blur-md rounded-2xl px-8 py-10 shadow-md hover:shadow-lg transition-all">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Welcome back
        </h2>
        <p className="text-center text-sm text-gray-700 mt-1">
          Don&apos;t have an account?{" "}
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

          <Button
  type="submit"
  className="w-full px-3 py-2 text-blue-900 font-semibold 
  bg-blue-300/40 backdrop-blur-md border border-white/30 
  rounded-lg shadow-sm hover:shadow-md hover:bg-blue-400/50 
  transition duration-200"
>
  Sign in
</Button>

        </form>
      </div>
    </div>
  );
}

export default Login;
