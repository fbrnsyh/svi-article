const config = require("../config/database");
const mysql = require("mysql");
const util = require("util");
const pool = mysql.createConnection(config);
const query = util.promisify(pool.query).bind(pool);

module.exports = {
  get: async (limit, offset) => {
    try {
      const data = await query(
        `SELECT id, content, category, title, status FROM posts LIMIT ? OFFSET ? ORDER BY id DESC`,
        [parseInt(limit), parseInt((offset - 1) * limit)]
      );
      return data;
    } catch (error) {
      return error;
    }
  },
  create: async (data) => {
    try {
      const result = await query(`INSERT INTO posts SET ?;`, [data]);
      return {
        message: "Entry Success !",
      };
    } catch (error) {
      return error;
    }
  },
  detail: async (id) => {
    try {
      const result = await query(
        `SELECT id, content, category, title, status FROM posts where id = ?`,
        [id]
      );
      return result[0];
    } catch (error) {
      return error;
    }
  },
  update: async (id, data) => {
    try {
      const result = await query(`UPDATE posts SET ? WHERE id = ?`, [data, id]);
      return {
        message: "Update Success !",
      };
    } catch (error) {
      return error;
    }
  },
  remove: async (res, id) => {
    try {
      const result = await query(`DELETE FROM posts WHERE id =  ?`, [id]);
      return {
        message: "Delete Success !",
      };
    } catch (error) {
      return error;
    }
  },
  getByStatus: async (status) => {
    try {
      const result = await query(
        `SELECT id, content, category, title, status FROM posts WHERE status =  ? ORDER BY id DESC`,
        [status]
      );
      return result;
    } catch (error) {
      return error;
    }
  },
  pagination: async (limit, offset) => {
    try {
      const result = await query(
        `SELECT id, content, category, title, status FROM posts WHERE status =  ? ORDER BY id DESC LIMIT ? OFFSET ?`,
        ["publish", limit, offset]
      );
      return result;
    } catch (error) {
      return error;
    }
  },
  moveTrash: async (id) => {
    try {
      const result = await query(`UPDATE posts SET status = ? WHERE id = ?`, [
        "trash",
        id,
      ]);
      console.log("result ", result);
      return {
        message: "Move trash success",
      };
    } catch (error) {
      return error;
    }
  },
};
