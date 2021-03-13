import { getSession } from "next-auth/client";
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

export default async function authMiddleware(req, res, next) {
  const session = await getSession({ req });
  if (session) {
    req.user = session;
    next();
  } else {
    try {
      let token = null;
      if (req.headers.authorization) {
        token = req.headers.authorization.replace("Bearer ", "").trim();
      }
      const decodedToken = jwt.verify(token, secret, { algorithms: ["HS256"] });
      req.user = decodedToken;
      next();
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized Access"
      });
    }
  }
}
