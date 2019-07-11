const HttpStatus = require("http-status");
const books = require('../models/books');
const cache = require('../utils/cache');

module.exports = function (router) {

  router.post("/books", async (ctx, next) => {
    ctx.status = HttpStatus.OK;
    ctx.body = await books.create(ctx.request.body);
    await next();
  });

  router.put("/books/:id", async (ctx, next) => {
    ctx.status = HttpStatus.OK;
    await books.update(ctx.params.id, ctx.request.body);
    ctx.body = await books.get(ctx.params.id);
    await next();
  });

  router.get("/books", async (ctx, next) => {
    ctx.status = HttpStatus.OK;
    //TODO validation, cache expire
    ctx.body = await cache.getOrPending(`books:${JSON.stringify(ctx.request.query)}`, () => books.list(ctx.request.query));
    await next();
  });

  router.get("/books/:id", async (ctx, next) => {
    ctx.status = HttpStatus.OK;
    //TODO validation, cache expire
    ctx.body = await cache.getOrPending(`books:${ctx.params.id}`, () => books.get(ctx.params.id));
    await next();
  });



}