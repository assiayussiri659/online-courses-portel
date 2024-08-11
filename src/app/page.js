"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn('credentials', {
        email, password, redirect: false
      }).then((response) => {
        console.log("RES", response)
        if (response.error) {
          setError("inviled Credentials");
          return false
        }

        if (session) {
          router.replace("dashboard")
        }
      })

    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* left side */}
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold text-primary">Welcome back</span>
          <span className="font-light text-gray-400 mb-8">
            Welcome back! Please enter your details
          </span>
          <form onSubmit={handleSubmit}>
            <div className="py-4">
              <span className="mb-2 text-md">Email</span>
              <input onChange={e => setEmail(e.target.value)}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                id="email"
              />
            </div>
            <div className="py-4">
              <span className="mb-2 text-md">Password</span>
              <input onChange={e => setPassword(e.target.value)}
                type="password"
                name="pass"
                id="pass"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>
            <div className="flex justify-between w-full py-4">
              <div className="mr-24">
                <input type="checkbox" name="ch" id="ch" className="mr-2" />
                <span className="text-md">Remember for 30 days</span>
              </div>
              <span className="font-bold text-md">Forgot password</span>
            </div>
            <button
              className="w-full bg-primary text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
            >
              Sign in
            </button>
          </form>
          {error && (
            <div className='bg-red-600 text-white w-28 text-sm py-1 rounded-md mt-3 text-center'>
              {error}
            </div>
          )}
          <button
            className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-primary hover:text-white"
          >
            <img src="google.png" alt="img" className="w-6 h-6 inline mr-2" />
            Sign in with Google
          </button>
          <button
            className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-primary hover:text-white"
          >
            <img src="facebook (1).png" alt="img" className="w-6 h-6 inline mr-2" />
            Sign in with Facebook
          </button>
          <div className="text-center text-gray-400">
            Don't have an account?
            <Link href="/Signup">
              <span className="font-bold text-black cursor-pointer"> Sign up for free</span>
            </Link>
          </div>
        </div>
        {/* right side */}
        <div className="relative">
          <img
            src="login.jpeg"
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
          {/* text on image */}
          <div className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
            {/* <span className="text-xl text-primary">
              We've been using Untitle to kickstart every new project and can't imagine working without it.
            </span> */}
          </div>
        </div>
      </div>
    </div>

  );
}
