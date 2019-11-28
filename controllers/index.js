const carttons = require("../services/cartoons");
const querystring = require("querystring");

const mime = require("mime");
const fs = require("mz/fs");
const path = require("path");

var fn_index = async (ctx, next) => {
  let origin = ctx.origin;
  let allCartoons = await carttons.getAllCartoons(origin);
  ctx.render("index.html", {
    title: "Welcome",
    cartoons: allCartoons
  });
};

var fn_home = async (ctx, next) => {
  const file = "./static/dist/index.html";

  try {
    if (await fs.exists(file)) {
      // 查找文件的mime
      ctx.response.type = mime.getType(file);
      // 读取文件内容并赋值给response.body;
      ctx.response.body = await fs.readFile(file);
    } else {
      // 文件不存在
      ctx.response.status = 404;
    }
  } catch (error) {
    console.log(error);
  }

  // let origin = ctx.origin;
  // let allCartoons = await carttons.getAllCartoons(origin);
  // ctx.render('index.html', {
  //     title: 'Welcome',
  //     cartoons: allCartoons
  // });
};

var fn_cartoon = async (ctx, next) => {
  let queryResult = querystring.parse(ctx.querystring);
  let cartton = queryResult.cartoon;
  let result = await carttons.getCartoonChapters(cartton);
  ctx.render("cartoon.html", {
    cartoonName: cartton,
    chapters: result.chapters
  });
};

var fn_cartoon_chapter = async (ctx, next) => {
  let queryResult = querystring.parse(ctx.querystring);
  let cartton = queryResult.cartoon;
  let chapter = queryResult.chapter;
  let origin = ctx.origin;
  let result = await carttons.getCartoonChapter(
    origin,
    cartton,
    chapter,
    false
  );

  ctx.render("chapter.html", {
    files: result.files
  });
};

var fn_signin = async (ctx, next) => {
  var email = ctx.request.body.email || "";
  var password = ctx.request.body.password;
  if (email === "admin@example.com" && password === "123456") {
    // 成功
    ctx.render("signin-ok.html", {
      title: "Sign In OK",
      name: "Mr Node"
    });
  } else {
    // 失败
    ctx.render("signin-false.html", {
      title: "Sign In Failed"
    });
  }
};

module.exports = {
  "GET /home": fn_home,
  "GET /": fn_index,
  "GET /cartoons": fn_cartoon,
  "GET /cartoons/chapter": fn_cartoon_chapter,
  "POST /signin": fn_signin
};
