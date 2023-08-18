import { jwtVerify, SignJWT } from "jose";

const alg = "HS256";
export const encode = async ({ secret, token, maxAge }) => {
  const encodedSecret = new TextEncoder().encode(secret);
  const encodedToken = await new SignJWT(token.payload ?? token)
    .setProtectedHeader({ alg })
    .setIssuedAt(token.iat)
    .setSubject(token.sub)
    .setExpirationTime(token.exp ?? +new Date() + 1000 * 60 * 60 * 24 * 30)
    .sign(encodedSecret);
  return encodedToken;
};
export const decode = async ({ secret, token, maxAge }) => {
  const encodedSecret = new TextEncoder().encode(secret);
  const decodedToken = await jwtVerify(token, encodedSecret, {
    algorithms: [alg],
  });
  return decodedToken;
};
