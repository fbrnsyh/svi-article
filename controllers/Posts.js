const config = require("../config/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);
const { validationResult } = require("express-validator");
const {
  getByStatus,
  moveTrash,
  create,
  detail,
  update,
  pagination,
} = require("../models/posts");

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  all: async (req, res) => {
    const trash = await getByStatus("trash");
    const draft = await getByStatus("draft");
    const publish = await getByStatus("publish");
    const breadcrumb = [
      {
        label: "Post",
        link: "/",
      },
      {
        label: "All Post",
        link: "/",
      },
    ];
    res.render("pages/post", {
      trash,
      draft,
      publish,
      breadcrumb,
    });
  },
  moveThrash: async (req, res) => {
    const { id } = req.params;
    console.log("id ", id);
    const result = await moveTrash(id);
    console.log("res ", result);
    res.redirect("/");
  },
  create: async (req, res) => {
    const breadcrumb = [
      {
        label: "Post",
        link: "/",
      },
      {
        label: "Add Post",
        link: "/",
      },
    ];
    res.render("pages/post/add", {
      title: "",
      content: "",
      category: "",
      breadcrumb,
    });
  },
  edit: async (req, res) => {
    const { id } = req.params;
    const post = await detail(id);
    const breadcrumb = [
      {
        label: "Post",
        link: "/",
      },
      {
        label: "Edit Post",
        link: "/",
      },
    ];
    res.render("pages/post/edit", {
      title: post.title,
      content: post.content,
      category: post.category,
      id,
      breadcrumb,
    });
  },
  preview: async (req, res) => {
    const { page } = req.query;
    const size = 4;
    console.log("page ", page);
    const publish = await getByStatus("publish");
    const totalData = Math.ceil(publish.length / size);
    const offset = page ? (page - 1) * size : 0;
    const data = await pagination(size, offset);
    console.log("data ", data);
    const breadcrumb = [
      {
        label: "Post",
        link: "/",
      },
      {
        label: "Preview",
        link: "/",
      },
    ];
    res.render("pages/post/preview", {
      publish: data,
      page,
      totalData,
      breadcrumb,
    });
  },
  insert: async (req, res) => {
    const { title, content, category, status } = req.body;
    const errors = validationResult(req);
    // console.log("error ", errors);
    if (!errors.isEmpty()) {
      //   res.status(422).json({ errors: errors.array() });
      res.render("pages/post/add", {
        title,
        content,
        category,
        errors: errors.array(),
      });
    } else {
      const result = await create({ title, content, category, status });
      return res.redirect("/posts");
    }
  },
  update: async (req, res) => {
    const { title, content, category, status, id } = req.body;
    console.log("req ", req.body);
    const errors = validationResult(req);
    const breadcrumb = [
      {
        label: "Post",
        link: "/",
      },
      {
        label: "All Post",
        link: "/",
      },
    ];
    // console.log("error ", errors);
    if (!errors.isEmpty()) {
      //   res.status(422).json({ errors: errors.array() });
      res.render("pages/post/edit", {
        title,
        content,
        category,
        id,
        errors: errors.array(),
        breadcrumb,
      });
    } else {
      let data = {
        title,
        content,
        category,
        status,
        updated_date: new Date(),
      };
      const result = await update(id, data);
      console.log("update ", result);
      return res.redirect("/posts");
    }
  },
};
