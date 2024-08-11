"use client"

// import { headers } from 'next/headers';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

function page() {
  const [error, setError] = useState("");


  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData = Object.fromEntries(formData.entries());
    console.log("formData", formData)
    const { name , email , password
  } = formData

  if (!name || !email || !password) {
    setError("All fields are necessarry.");
    return;
  }

  try {

    const resUserExist = await fetch('api/userExist', {
      method: "POST",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify({ email }),  
    });


    const {user} = await resUserExist.json();

    if(user){
      setError("user already exist.");
      return;
    }



    const res = await fetch("/api/Signup", { // Corrected the URL
      method: "POST",
      headers: {
        "Content-Type": "application/json" // Corrected the capitalization
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const form = e.target;
      form.reset();
      router.push("/");
      console.log("User signed up successfully");
    } else {
      console.log("User signup failed.");
    }
  } catch (error) {
    console.log("Error during signup:", error);
  }

};
return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
      {/* left side */}
      <div className="flex flex-col justify-center p-8 md:p-14">
        <span className="mb-3 text-4xl font-bold text-primary">Create Account</span>
        <span className="font-light text-gray-400 mb-8">
          Sign up with your details to create a new account
        </span>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="py-4" >
            <span className="mb-2 text-md" >Full Name</span>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="name"
            // id="Fullname"
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Email</span>
            <input
              type="email"
              name="email"
              // id="password"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Password</span>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <button type='submit'
            className="w-full bg-primary text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
          >
            Sign up
          </button>
        </form>
        {error && (
          <div className='bg-red-600 text-white w-28 text-sm py-1 rounded-md mt-1 text-center'>
            {error}
          </div>
        )
        }
        <div className="text-center text-gray-400">
          Already have an account?
          <a href="/" className="font-bold text-black"> Sign in</a>
        </div>
      </div>
      {/* right side */}
      <div className="relative">
        <img
          src="Sign up.jpg"
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
)
}

export default page
