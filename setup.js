const {end, query} = require("./utils/mysql");

(async function () {

  await query(`CREATE TABLE IF NOT EXISTS Authors (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title varchar(255) COLLATE 'utf8_general_ci' NOT NULL,
    createdAt datetime NOT NULL,
    updatedAt datetime NOT NULL
  ) ENGINE='MyISAM' COLLATE 'utf8_general_ci';`).then(() => console.log('Authors created'));

  await query(`CREATE TABLE IF NOT EXISTS Books (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title varchar(255) COLLATE 'utf8_general_ci' NOT NULL,
    authorId int NOT NULL,
    date datetime NOT NULL,
    description text NOT NULL,
    imageId int NOT NULL,
    createdAt datetime NOT NULL,
    updatedAt datetime NOT NULL
  ) ENGINE='MyISAM' COLLATE 'utf8_general_ci';`).then(() => console.log('Books created'));

  await query(`CREATE TABLE IF NOT EXISTS Images (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    filename varchar(255) COLLATE 'utf8_general_ci' NOT NULL,
    createdAt datetime NOT NULL,
    updatedAt datetime NOT NULL
  ) ENGINE='MyISAM' COLLATE 'utf8_general_ci';`).then(() => console.log('Images created'));

  await query(`ALTER TABLE Books
    ADD INDEX authorId (authorId),
    ADD INDEX imageId (imageId);
    ADD INDEX title (title);
    ADD INDEX date (date);
    `);

  end();

})();





