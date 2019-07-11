const books = require('./models/books');

for (let i = 0; i < 100000; i++) {

  books.create({
    title: `Book ${i} ${Math.random()}`,
    description: `Description ${i} ${Math.random()}`,
    imageId: 1,
    authorId: 1,
    date: '2019-07-10 12:40:29'
  });

}