const {insert, remove, select, update} = require("../utils/mysql");
const moment = require('moment');
const cache = require('../utils/cache');
const DEFAULT_LIMIT = 100;
const _ = require('lodash');


class Base {

  get table() {
    throw new Error('table should by overriden');
  }

  get attributes() {
    throw new Error('attributes should by overriden');
  }

  validate(values) {
    //TODO
  }

  async create(values) {
    this.validate(values);

    values.createdAt = moment().format("YYYY-MM-DD hh:mm:ss");
    values.updatedAt = moment().format("YYYY-MM-DD hh:mm:ss");

    const result = await insert(this.table, values);
    return {id: result.insertId, ...values}

  }

  async update(pk, values) {
    this.validate(values);
    values.updatedAt = moment().format("YYYY-MM-DD hh:mm:ss");
    await update(this.table, pk, values);
    return {id: pk}
  }

  async list(condition = {}) {

    if (!condition.limit) {
      condition.limit = DEFAULT_LIMIT;
    }

    if (condition.limit) {
      condition.limit = parseInt(condition.limit);
    }

    if (condition.offset) {
      condition.offset = parseInt(condition.offset);
    }

    condition.where = _.pick(condition, this.attributes);
    condition = _.omit(condition, this.attributes);

    if (condition.order && !Array.isArray(condition.order)) {
      condition.order = [condition.order];
    }

    const re = new RegExp(`^(${this.attributes.join('|')})( asc| desc)?$`, "g");

    if (condition.order) {
      condition.order = condition.order.filter(item => {
        return item.match(re);
      })
    }

    return select(this.table, condition);
  }

  async get(id) {
    return select(this.table, {where: {id}, limit: 1});
  }
  async delete(id) {
    return remove(this.table, {id});
  }

}

module.exports = Base;
