// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nc from "next-connect";
import authMiddleware from "../../middleware/authMiddleware";
import dbMiddleware from "./../../middleware/dbMiddleware";
export default nc()
  .use(dbMiddleware)
  .use(authMiddleware)
  .get((req, res) => {
    res.statusCode = 200;
    res.json({ name: "" });
  });
