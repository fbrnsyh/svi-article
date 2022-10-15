const { body } = require("express-validator");

const articlePostCheck = () => {
  return [
    body("title")
      .isLength({ min: 20 })
      .withMessage("Please input title minimum 20 chars"),
    body("content")
      .isLength({ min: 200 })
      .withMessage("Please input content minimum 200 chars"),
    body("category")
      .isLength({ min: 3 })
      .withMessage("Please input category minimum 3 chars"),
    body("status").isIn(["publish", "draft", "trash"]),
  ];
};

module.exports = {
  articlePostCheck,
};
