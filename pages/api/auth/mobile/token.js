import nc from "next-connect";
import dbMiddleware from "./../../../../middleware/dbMiddleware";
import { getCsrfToken } from "next-auth/client";
import UserModel from "./../../../../models/users";
import Bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default nc()
  .use(dbMiddleware)
  .post(async (req, res) => {
    let { body } = req;
    const csrfToken = await getCsrfToken({ req });
    try {
      let user = await UserModel.findOne({
        auth_type: 1,
        email: body.username
      });

      if (!user) {
        res.statusCode = 422;
        return res.json({
          message: "invalid username and password"
        });
      }

      const compare = await Bcrypt.compare(body.password, user.password);
      res.statusCode = 200;
      if (compare) {
        const jwtClaims = {
          sub: user._id,
          user_id: user._id,
          name: user.name,
          email: user.email,
          image: user.image
        };
        const encodedToken = jwt.sign(jwtClaims, process.env.JWT_SECRET, {
          algorithm: "HS256"
        });

        return res.json({ token: encodedToken });
      } else {
        res.statusCode = 422;
        return res.json({
          message: "invalid username and password"
        });
      }
    } catch (error) {}
    res.statusCode = 422;
    res.json({
      k: csrfToken
    });
  });
