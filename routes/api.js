var express = require("express");
var router = express.Router({ mergeParams: true });
const api = require("../controllers/API");
const { articlePostCheck } = require("../config/validator");

router.get("/article/:limit/:offset", api.getArticle);
router.post("/article", articlePostCheck(), api.createArticle);
router.get("/article/:id", api.detailArticle);
router.put("/article/:id", articlePostCheck(), api.updateArticle);
router.delete("/article/:id", api.deleteArticle);

module.exports = router;
