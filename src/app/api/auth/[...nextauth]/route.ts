import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import type { NextAuthOptions } from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { toast } from "react-toastify";

const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await NextAuth(req, res, options);
  } catch (error) {
    toast.error("NextAuth error:" + error, { autoClose: 2000 });
    console.error("NextAuth error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { handler as GET, handler as POST };