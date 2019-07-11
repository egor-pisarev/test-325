require('dotenv').config();

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
});

connection.connect();

const query = (query, values = []) => {
  return new Promise((resolve, reject) => {

    connection.query(query, values, function (error, results, fields) {
      if (error) reject(error);
      resolve(results);
    });
  })
}

const insert = async function (table, values) {
  return query(`INSERT INTO ${table} (${Object.keys(values).join(',')}) VALUES (${Object.keys(values).map(() => '?').join(',')})`, Object.values(values));
}

const update = async function (table, pk, values) {
  return query(`UPDATE ${table} SET ${Object.keys(values).map((name) => `${name}=?`).join(',')} WHERE id=?`, [...Object.values(values), pk]);
}

const select = async function (table, condition, attributes = ['*']) {

  let q = `SELECT ${attributes.join(',')} FROM ${table}`;
  let v = []

  if (condition.where) {
    q = `${q} WHERE ${Object.keys(condition.where).length > 0 ?
      Object.keys(condition.where).map((name) => condition.where[name].match(/[<>=]/i) ? `${name}?` : `${name}=?`).join(' AND ') : '1'}`;
    v = Object.values(condition.where).map((value) => value.replace(/[<>=]/i, ""));
  }

  if (condition.order && condition.order.length > 0) {
    q = `${q} ORDER BY ${Array.isArray(condition.order)? condition.order.join(','): condition.order}`
  }

  if (condition.limit && condition.offset) {
    q = `${q} LIMIT ${condition.offset}, ${condition.limit}`
  }

  if (condition.limit && !condition.offset) {
    q = `${q} LIMIT ${condition.limit}`
  }

  return query(q, v);
}

const remove = async function (table, condition) {
  return query(`DELETE FROM ${table} WHERE ${Object.keys(condition).map((name) => `${name}=?`).join(',')}`, Object.values(condition));
}

const end = () => connection.end()

module.exports = {
  connection,
  query,
  insert,
  update,
  select,
  remove,
  end
}