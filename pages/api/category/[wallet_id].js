import nc from "next-connect";
import dbMiddleware from "./../../../middleware/dbMiddleware";
import authMiddleware from "./../../../middleware/authMiddleware";

export default nc()
  .use(dbMiddleware)
  .use(authMiddleware)
  .get(async (req, res) => {
    //TODO Get All Category by wallet id
    res.statusCode = 200;
    res.json({});
  })
  .put(async (req, res) => {
    let { body } = req;
    //TODO Update Category by wallet id

    res.statusCode = 200;
    res.json({});
  })
  .delete(async (req, res) => {
    //TODO Delete Category by wallet id

    res.statusCode = 200;
    res.json({});
  });
