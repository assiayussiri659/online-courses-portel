import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import process from "process";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/User";
import bcrypt from "bcrypt";


const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials){
                const {email, password} = credentials;
                try {
                    await connectMongoDB();
                  const user =  await User.findOne({email});
                  console.log("user", user);

                  if(!user) {
                    return null;
                  }

               const passwordsMatch =  await bcrypt.compare(password, user.password);

               if (!passwordsMatch){
                return null;
               }
                return user;
                } catch (error) {
                    console.log("Error: ", error);
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        singIn: "/",
    }
}


const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};