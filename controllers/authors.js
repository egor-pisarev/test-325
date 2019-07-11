const HttpStatus = require("http-status");
const authors = require('../models/authors');

module.exports = function (router) {

  router.post("/authors", async (ctx, next) => {
    ctx.status = HttpStatus.OK;
    ctx.body = await authors.create(ctx.request.body);
    await next();
  });

  router.put("/authors/:id", async (ctx, next) => {
    ctx.status = HttpStatus.OK;
    ctx.body = await authors.update(ctx.request.params.id, ctx.request.body);
    await next();
  });
  
  router.get("/authors", async (ctx, next) => {
    ctx.status = HttpStatus.OK;
    ctx.body = await authors.list(ctx.request.body);
    await next();
  });


}