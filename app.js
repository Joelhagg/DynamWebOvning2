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
      <input type="text" name="title" placeholder="Titel"/><br>
      <input type="text" name="author" placeholder="Författare"/><br>
      <input type="number" name="pages"placeholder="Antal sidor"/><br><br>
      <button>Lägg till bok</button>
     </form>`;

  res.send(printForm);
});

let books = [];

app.post("/saveBook", (req, res) => {
  let exampleBooks = [{ title: "Bok1", author: "Författare1", pages: "123" }];
  let addedBook = [
    { title: req.body.title, author: req.body.author, pages: req.body.pages },
  ];

  if (books.length == 0) {
    books.push(exampleBooks);
    books.push(addedBook);
  } else {
    books.push(addedBook);
  }
  res.json(books);
});

module.exports = app;
