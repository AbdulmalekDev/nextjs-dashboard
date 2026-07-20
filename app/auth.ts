import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from 'zod';
import type {User} from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import postgres from "postgres";





const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
async function getUser(email: string) : Promise<User | undefined > {
    try{
             const user =  await  sql<User[]>`SELECT * FROM users WHERE email=${email}`;
             return user[0];
    }
    catch(error){
        console.log('Error fetching user from database:', error);
        throw new Error('Faild To Fetach User');

        }
}

export const {auth , signIn , signOut} = NextAuth({
    ...authConfig ,
    providers:[Credentials
        ({
    async authorize(credentials) {
    const parsedCredentials = z
    .object({email : z.string().email() , password: z.string().min(6)})
    .safeParse(credentials);
    if(parsedCredentials.success){
        const {email , password } = parsedCredentials.data ;
        const user = await getUser(email);
        if(!user)return null;
        const passwordMaths = await bcrypt.compare(password , user.password);
        if(passwordMaths) return user;

    }
      console.log('Invalid credentials');
    return null ;
   },
    }),
],

})