// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nc from "next-connect";
import authMiddleware from "../../middleware/authMiddleware";

export default nc()
  .use(authMiddleware)
  .get((req, res) => {
    res.statusCode = 200;
    res.json({ name: "John Doe this is my final output" });
  });
