import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import * as jwtConfig from "../../../utils/jwt";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address
        const { username, password } = credentials;
        if (username === password) {
          return { id: username, name: username };
        }
        return null;
      },
    }),
  ],
  session: {
    jwt: true,
  },
  jwt: jwtConfig,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token["x-triplit-user-id"] = user.id;
      }
      token["x-triplit-project-id"] = "89d9596b-590a-4e57-afe4-3033180abfa1";
      return token;
    },
    async session({ session, token, user }) {
      const encodedToken = jwt.sign(token, process.env.NEXTAUTH_SECRET, {
        algorithm: "HS256",
      });
      session.user = { name: token.payload.name };
      session.token = encodedToken;
      return session;
    },
  },
};

export default NextAuth(authOptions);
