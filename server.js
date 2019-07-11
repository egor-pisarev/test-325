const Koa = require("koa");
const BodyParser = require("koa-bodyparser");
const Router = require("koa-router");
const Logger = require("koa-logger");
const serve = require("koa-static");
const mount = require("koa-mount");
const cors = require('koa-cors');

const app = new Koa();

const PORT = process.env.PORT || 3000;

app.use(BodyParser());
app.use(Logger());
app.use(cors());

const router = new Router();

const mysql = require('./utils/mysql');

require("./controllers/books")(router);
require("./controllers/authors")(router);

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, function () {
    console.log("Listening on port %s. Visit http://localhost:%s/", PORT, PORT);
});

