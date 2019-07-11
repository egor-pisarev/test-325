Books list
------------

GET /books
GET /books?id=ID
GET /books?id=ID&title=TITLE
GET /books?title=TITLE&order=id&order=date desc&limit=10&offset=100


Single book
------------

GET /books/:id

Create Book
------------

POST /books

{title: string, description: text, author: number | string, image: base64, date: date}

Update Book
------------

PUT /books/:id


Authors
------------


