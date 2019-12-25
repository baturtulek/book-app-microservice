require("dotenv").config();
const express   = require('express');
const session   = require('express-session');
const axios     = require('axios');
const app       = express();
const USER_API  = process.env.USER_API;
const BOOK_API  = process.env.BOOK_API;

app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('src/public'));

app.use(session({
    secret: 'some random secret',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

app.get('/user/login', (req, res) => {
    if (req.session.accessToken) {
      return res.redirect('/');
    }
    res.render('auth/login');
});

app.post('/user/login', async (req, res, next) => {
    const credentials = req.body;
    try {
      const loginResponse = await axios.post(`${USER_API}/users/login`, credentials);
      const accessToken = loginResponse.data.token;
  
      const profileResponse = await axios.get(`${USER_API}/users/profile`, {
        headers: { authorization: `Bearer ${accessToken}` }
      });
      req.session.accessToken = accessToken;
      req.session.user = profileResponse.data.data.user;
  
      res.redirect('/');
    } catch (err) {
        console.log(err);
        if (err.response) {
            return res.redirect('/auth/login?error=invalid_credentials');
          }
      next(err);
    }
});

app.get('/user/register', (req, res) => {
    let status = 0;
    if (req.session.accessToken) {
      return res.redirect('/');
    }
    res.render('auth/register', {status});
});

app.post('/user/register', async (req, res, next) => {
    const credentials = req.body;
    try {
      await axios.post(`${USER_API}/users/register`, credentials)
      res.redirect('/user/login');
    } catch (err) {
        console.log(err);
        next(err);
    }
});

app.get('/user/logout', async (req, res) => {
    if (!req.session.accessToken) {
        return res.redirect('/');
    }
    delete req.session.accessToken;
    delete req.session.user;
    res.redirect('/');
    //We use JWT.

    // try {
    //     await axios.get(`${USER_API}/users/logout`, {
    //         headers: { authorization: `Bearer ${req.session.accessToken}` }
    //     });
    // delete req.session.accessToken;
    // delete req.session.user;
    // res.redirect('/');
    // } catch (err) {
    //     console.log(err.status);
    // }
});

app.get('/', async (req, res, next) => {
    try {
      const bookListResponse = await axios.get(`${BOOK_API}/books/`);
      res.render('books/bookList', { books: bookListResponse.data.books });
    } catch (err) {
      next(err);
    }
});

app.get("/books/detail/:bookId", async (req, res) => {
    try {
        const bookResponse = await axios.get(`${BOOK_API}/books/detail/${req.params.bookId}`);
        if (!bookResponse.data.book) {
          return res.render('error/404');
        }
        res.render('books/detail', { book: bookResponse.data.book });
      } catch (err) {
        console.log(err);
      }
});

app.get('/books/add', (req, res) => {
    if (typeof req.session.accessToken === 'undefined') {
        return res.render('error/unauthorized');
      }
    
    return res.render('books/addBook');
});

app.post("/books/add/", async (req, res, next) => {
    if (typeof req.session.accessToken === 'undefined') {
        return res.render('error/unauthorized');
    }
    const bookInformations = req.body;
    try {
        await axios.post(`${BOOK_API}/books/add`, bookInformations, {
            headers: { authorization: `Bearer ${req.session.accessToken}` }
        });
        res.redirect('/');
    } catch (err) {
      next(err);
    }
});

app.get('/books/delete/:bookId', async (req, res, next) => {
    if (typeof req.session.accessToken === 'undefined') {
        return res.render('error/unauthorized');
    }
    try {
        await axios.get(`${BOOK_API}/books/delete/${req.params.bookId}`, {
            headers: { authorization: `Bearer ${req.session.accessToken}` }
        });
        res.redirect('/');
    } catch (err) {
      next(err);
    }
});

app.listen(process.env.PORT, () => {
    console.log(`UI listening on port ${process.env.PORT}!`);
});
  