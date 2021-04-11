import nc from "next-connect";
import dbMiddleware from "./../../../middleware/dbMiddleware";
import authMiddleware from "./../../../middleware/authMiddleware";
import Wallet from "./../../../models/Wallets";
import Category from "./../../../models/Category";
import DefaultCategory from "./../../../category_final_list.json";
import { groupBy, keyBy, mapValues, omit, get } from "lodash";

export default nc()
  .use(dbMiddleware)
  .use(authMiddleware)
  .get(async (req, res) => {
    //TODO Get All Wallet
    let { user, session } = req;

    let list = await Wallet.find({ owner_id: user.user_id });
    res.statusCode = 200;
    res.json(list);
  })
  .post(async (req, res) => {
    let { body, user } = req;

    body.owner_id = user.user_id;
    body.created_at = new Date();
    body.updated_at = null;
    let newWallet = new Wallet(body);
    newWallet = await newWallet.save();

    let obj_category = keyBy(DefaultCategory, "cat_id");
    let grouped_category = mapValues(
      groupBy(DefaultCategory, "parent_id"),
      (clist) => clist
    );

    let filter = Object.keys(grouped_category).map((parent_key, index) => {
      return {
        ...get(obj_category, parent_key, {}),
        subcategory: get(grouped_category, parent_key)
      };
    });

    filter.forEach(async (category, index) => {
      if (category.cat_id) {
        let mParentCategory = new Category({
          wallet_id: newWallet._id,
          type: category.cat_type,
          name: category.cat_name,
          icon_id: "default"
        });

        mParentCategory = await mParentCategory.save();

        for (let i = 0; i < category.subcategory.length; i++) {
          let mSubCategory = new Category({
            wallet_id: newWallet._id,
            type: category.subcategory[i].cat_type,
            name: category.subcategory[i].cat_name,
            icon_id: "default",
            parent_id: mParentCategory._id
          });

          mSubCategory = await mSubCategory.save();
        }
      } else {
        for (let i = 0; i < category.subcategory.length; i++) {
          let mMainSubCategory = new Category({
            wallet_id: newWallet._id,
            type: category.subcategory[i].cat_type,
            name: category.subcategory[i].cat_name,
            icon_id: "default"
          });

          mMainSubCategory = await mMainSubCategory.save();
        }
      }
    });

    res.statusCode = 200;
    res.json({ message: newWallet });
  });
