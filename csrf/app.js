const express = require('express');
const partials = require('express-partials');
const path = require('path');
const app = express();

const csurf = require('csurf');
const cookieParser = require('cookie-parser');

const PORT = 4001;

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(partials());

app.use(cookieParser());

app.set('trust proxy', 1) 

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "/public")));

const csrfMiddleware = csurf({
  cookie: {
    maxAge: 300000000,
    secure: true,
    sameSite: 'none'
  }
});
  
app.use(csrfMiddleware);

app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN'){
    res.status(403);
    res.send("The CSRF token is invalid");
  } else {
    next();
  }
}) 

app.get('/', (req, res) => {
  res.render('form', {csrfToken: req.csrfToken()})
})

app.post('/submit', (req, res) => {
  res.send(`<p>Post successful!</p> <p>CSRF token used: ${req.body._csrf}</p>`);
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`) );
