var express = require("express");
var router = express.Router();
const post = require("../controllers/Posts");
const { articlePostCheck } = require("../config/validator");

router.get("/", post.all);
router.get("/posts", post.all);
router.post("/posts/add", articlePostCheck(), post.insert);
router.get("/posts/add", post.create);
router.get("/posts/edit/:id", post.edit);
router.post("/posts/edit/:id", articlePostCheck(), post.update);
router.get("/posts/preview", post.preview);
router.get("/posts/trash/:id", post.moveThrash);

module.exports = router;
