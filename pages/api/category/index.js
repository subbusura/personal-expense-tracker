import nc from "next-connect";
import dbMiddleware from "./../../../middleware/dbMiddleware";
import authMiddleware from "./../../../middleware/authMiddleware";

export default nc()
  .use(dbMiddleware)
  .use(authMiddleware)
  .get(async (req, res) => {
    //TODO Get All Category by wallet id

    res.statusCode = 200;
    res.json({
      user: req.user
    });
  })
  .post(async (req, res) => {
    let { body } = req;
    //TODO Add New Category by wallet id
    res.statusCode = 200;
    res.json({});
  });
