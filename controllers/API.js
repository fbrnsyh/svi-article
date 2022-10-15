const config = require("../config/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);
const { validationResult } = require("express-validator/check");
const { get, create, detail, update, remove } = require("../models/posts");

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  getArticle: async (req, res, next) => {
    try {
      const { limit, offset } = req.params;
      const result = await get(limit, offset);
      res.json(result);
    } catch (error) {
      return next(error);
    }
  },
  createArticle: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }
      const { title, content, category, status } = req.body;
      let data = {
        title,
        content,
        category,
        status,
      };
      const result = await create(data);
      res.json(result);
    } catch (error) {
      return next(err);
    }
  },
  detailArticle: async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await detail(id);
      res.json(result);
    } catch (error) {
      return next(error);
    }
  },
  updateArticle: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }
      const { id } = req.params;
      const { title, content, category, status } = req.body;
      let data = {
        title,
        content,
        category,
        status,
        updated_date: new Date(),
      };
      const result = await update(id, data);
      res.json(result);
    } catch (error) {
      return next(error);
    }
  },
  deleteArticle: async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await remove(id);
      res.json(result);
    } catch (error) {
      return next(error);
    }
  },
};
