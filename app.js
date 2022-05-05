var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.get("/books/:bookId", function (req, res) {
  let showBook = req.params.bookId;
  res.send("Hej till books routern! Visa info om bok nummer " + showBook);
});

app.get("/buss/:from/:to", function (req, res) {
  res.send(
    "visar bussresor från " + req.params.from + " till " + req.params.to + "."
  );
});

app.get("/addBook", (req, res) => {
  let printForm = `<h1>Lägg till bok</h1>
     <form action="saveBook" method="post">Vill du lägga till en bok?<br><br>
      <input type="text" required="required" name="title" placeholder="Titel"/><br>
      <input type="text" required="required" name="author" placeholder="Författare"/><br>
      <input type="number" required="required" name="pages"placeholder="Antal sidor"/><br><br>
      <button>Lägg till bok</button>
      <br />
      <br />
      </form>
      <a href="/"><button>tillbaka till start</button></a>
      `;

  res.send(printForm);
});

let books = [];

app.post("/saveBook", (req, res) => {
  let addedBook = {
    title: req.body.title,
    author: req.body.author,
    pages: req.body.pages,
  };

  if (books.length == 0) {
    books.push(addedBook);
  } else {
    books.push(addedBook);
  }

  let linkToBooks = `<h1>Boken med titel: ${
    req.body.title +
    ", skriven av: " +
    req.body.author +
    ", med sidor: " +
    req.body.pages +
    " lades till i biblioteket"
  }<h1><br /><a href="/books"><button>Visa alla böcker</button></a>`;

  res.send(linkToBooks);
});

app.get("/books", (req, res) => {
  let bookList = books.map((book) => {
    return `<li><h4>Titel: ${book.title}. Författare: ${book.author}. Sidor: ${book.pages} </h4> </li>`;
  });

  let text = "<h1>Alla böcker</h1>";

  let allBooks = `<ul>${bookList}</ul>`;

  let backToStart = '<a href="/"><button>Tillbaka till startsidan</button></a>';

  res.send(text + allBooks + backToStart);
});

module.exports = app;
