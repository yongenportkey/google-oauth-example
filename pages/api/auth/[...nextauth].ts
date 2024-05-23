import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { generators } from "openid-client"

var nonce = "4242424242424242424242424242424242424242424242424242424242424242";

export function set_nonce(nonce_: string) {
  nonce = nonce_;
}

function nonce_getter(_?: number): string {
  return nonce.toString();
}

generators.nonce = nonce_getter


export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid",
          // This ensures that a nonce is used and that tokens are returned
          // nonce: 'true',
        },
      },
      checks: ["pkce", "state", "nonce"],
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        const { id_token } = account;

        console.log(id_token);
      }

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
});
