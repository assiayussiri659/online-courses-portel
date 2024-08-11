import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongodb';
import User from '../../../../models/User';




export async function POST(req) {
    try {
      // Debugging statement to confirm request reach
      console.log("Request received");
  
      // Parse request body
      const data = await req.json();
      const { name, email, password } = data;
  
      // Log parsed data
      console.log("Parsed data:", data);
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Password:", password);
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Connect to MongoDB
      await connectMongoDB();
  
      // Create new user
      await User.create({ name, email, password: hashedPassword });
  
      // Return success response
      return NextResponse.json({ message: "User signed up successfully" }, { status: 201 });
    } catch (error) {
      // Log the error to the console
      console.error("Error during user signup:", error);
  
      // Return error response
      return NextResponse.json({ message: "An error occurred while signing up the user." }, { status: 500 });
    }
  }
