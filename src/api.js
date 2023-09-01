const express = require('express');
const Book = require('./Book');

const stor = {
    books: [],
    user: {
        id: 1, 
        mail: "test@mail.ru",
    },
}

const app = express();
app.use(express.json);

app.get('/api/books', (req, res) => {
    const {books} = stor;
    res.json(books);
});

app.get('/api/books/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex((el) => el.id === id);
    if (idx !== -1) {
        res.json(books[idx]);
    } else { 
        res.status(404);
        res.json('404 | страница не найдена')
    }

});

app.post('/api/books', (req, res) => {
    const {books} = stor;
    const {
        title, 
        authors, 
        description, 
        favorite, 
        fileCover, 
        fileName
    } = req.body;

    const newBook = new Book(
        title, 
        authors, 
        description, 
        favorite, 
        fileCover, 
        fileName
    );
    books.push(newBook);

    res.status(201);
    res.json(newBook);
});

app.post('/api/user/login', (req, res) => {
    const {user} = stor;
    res.status(201);
    res.json(user);
});

app.put('/api/books/:id', (req, res) => {
    const {books} = stor;
    const {
        title, 
        authors, 
        description, 
        favorite, 
        fileCover, 
        fileName
    } = req.body;

    const {id} = req.params;
    const idx = books.findIndex((el) => el.id === id);

    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title, 
            authors, 
            description, 
            favorite, 
            fileCover, 
            fileName
        }
        res.json(books[idx]);
    } else { 
        res.status(404);
        res.json('404 | страница не найдена')
    }
});

app.delete('/api/books/:id', (req, res) => {
    const {books} = stor;
    const {id} = req.params;
    const idx = books.findIndex((el) => el.id === id);
    if (idx !== -1) {
        res.slice(idx, 1);
        res.json('ok')
    } else { 
        res.status(404);
        res.json('404 | страница не найдена')
    }
});


const PORT = process.env.PORT || 3005;
app.listen(PORT);
