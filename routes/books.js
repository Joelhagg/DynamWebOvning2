const express = require("express");
const nanoId = require("nanoid");

const { json } = require("express/lib/response");
var router = express.Router();

let books = [
  {
    id: nanoId.nanoid(),
    bookName: "Godnatt mister Tom",
    author: "Michelle Magorian",
    pages: 375,
    rented: false,
  },
  {
    id: nanoId.nanoid(),
    bookName: "Cant hurt me",
    author: "David Goggins",
    pages: 363,
    rented: true,
  },
];

router.get("/", (req, res) => {
  let printBooks = `<div><br /><a href="/" ><button>Tillbaka till start</button></a><h1>Våra Böcker:</h1>`;

  books.forEach((book) => {
    printBooks += `<a href="/books/${book.id}"><div><h2>${book.bookName}</h2></div></a>`;
  });

  printBooks += `<div><a href="/books/newBook"><button>Lägg till ny bok</button></a></div></div>`;

  res.send(printBooks);
});

router.get("/newBook", (req, res) => {
  let form = `<form action="newBook" method="post" >
        <h2>Lägg till ny bok</h2>
        <div><input type="text" name="bookName" /> Titel</div>
        <div><input type="text" name="author" /> Författare</div>
        <div><input type="number" name="pages" /> Sidor</div>
        <br />
        <div><button type="submit" >Lägg till</button></div>
    </form>
    <br />
    <a href="/books" ><button>Tillbaka till böcker</button></a>
    `;

  res.send(form);
});

router.get("/:id", (req, res) => {
  let foundBook = books.find((book) => book.id == req.params.id);

  if (!foundBook) {
    return res.send("Ingen bok hittades med id: " + req.params.id);
  }

  let bookInfo = `
    <div>
      <h3>Bokens titel: ${foundBook.bookName}</h3>
      <h3>Författaren: ${foundBook.author}</h3>
      <h3>Antal sidor: ${foundBook.pages}</h3>
      <h3>${
        foundBook.rented
          ? "Boken är tyvärr utlånad"
          : "Boken ska finnas i biblioteket vill du låna den?"
      }</h3>
      <div>${
        foundBook.rented
          ? ""
          : `<button onclick = "location.href='/books/rentBook/${foundBook.id}'">Låna</button>`
      }
      </div> 
      <br />
    </div>
    <a href="/books"><button>tillbaka till böcker</button><a/>
    `;

  res.send(bookInfo);
});

router.get("/rentBook/:id", (req, res) => {
  let foundBook = books.find((book) => book.id == req.params.id);
  let bookIndex = books.findIndex((book) => book.id == req.params.id);

  let rentedBook = { ...foundBook, rented: true };

  console.log("foundBook", foundBook);

  books.splice(bookIndex, 1);
  books.push(rentedBook);

  res.redirect("/books");
});

router.post("/newBook", (req, res) => {
  let newBook = { ...req.body, id: nanoId.nanoid(), rented: false };
  books.push(newBook);

  res.redirect("/books");
});

module.exports = router;
