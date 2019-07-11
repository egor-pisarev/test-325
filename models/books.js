const Base = require('./base');
const authors = require('./authors');
const images = require('./images');

class Books extends Base {
  get table() {
    return 'Books'
  }
  get attributes() {
    return ['id', 'title', 'description', 'date', 'authorId']
  }

  async create(values) {

    if (typeof values.author === 'number') {
      if (await authors.get(values.author)) {
        values.authorId = values.author;
      }
    }

    if (typeof values.author === 'string') {

      let author = await authors.create({title: values.author});
      values.authorId = author.id;
      delete values.author;

    }

    if (values.image) {
      let image = await images.createFromBase64(values.image);
      values.imageId = image.id;
      delete values.image;
    }

    return super.create(values);

  }
}

module.exports = new Books;
