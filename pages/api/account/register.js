// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nc from "next-connect";
import dbMiddleware from "./../../../middleware/dbMiddleware";
export default nc()
  .use(dbMiddleware)
  .post((req, res) => {
    let { body } = req;

    res.statusCode = 200;
    res.json(body);
  });
