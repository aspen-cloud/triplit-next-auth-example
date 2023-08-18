import withAuth from "next-auth/middleware";
import { authOptions } from "./pages/api/auth/[...nextauth]";

// export { default } from "next-auth/middleware";
import * as jwtConfig from "./utils/jwt";

export default withAuth({
  jwt: { decode: jwtConfig.decode },
  callbacks: {
    authorized: ({ token, req }) => {
      console.log("authorized?", !!token, token);
      !!token;
    },
  },
});

export const config = { matcher: ["/lesson/(.*)"] };
