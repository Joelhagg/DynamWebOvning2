// app.get("/addBook", (req, res) => {
//   let printForm = `<h1>Lägg till bok</h1>
//      <form action="saveBook" method="post">Vill du lägga till en bok?<br><br>
//       <input type="text" name="title" placeholder="Titel"/><br>
//       <input type="text" name="author" placeholder="Författare"/><br>
//       <input type="number" name="pages"placeholder="Antal sidor"/><br><br>
//       <button>Lägg till bok</button>
//      </form>`;

//   res.send(printForm);
// });

// let books = [];

// app.post("/saveBook", (req, res) => {
//   let exampleBooks = [{ title: "Bok1", author: "Författare1", pages: "123" }];
//   let addedBook = [
//     { title: req.body.title, author: req.body.author, pages: req.body.pages },
//   ];
//   if ((req.body.title = books.title)) {
//     console.log("inte tillagd, finns redan");
//     books.push(exampleBooks);
//   } else {
//     books.push(addedBook);
//   }

//   res.json(books);
// });
