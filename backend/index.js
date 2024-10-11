import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());

// ------ Connection to mySQL Databbase ------
// * ------- UPDATE YOUR MYSQL CREDENTIALS HERE ------- *//
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "bookhub",
  port: "8889",
});

// ------ SET UP ROUTES ------

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello this is the backend");
});

// Get list of books
app.get("/books", (req, res) => {
  const q = "SELECT * FROM inventory";
  db.query(q, (err, data) => {
    if (err) return res.json(err);

    // Format the publication_date before sending the response
    const formattedData = data.map((book) => ({
      ...book,
      publication_date: new Date(book.publication_date)
        .toISOString()
        .split("T")[0], // Format the date to 'YYYY-MM-DD'
    }));

    return res.json(formattedData);
  });
});

// Insert book
app.post("/books", (req, res) => {
  const q =
    "INSERT INTO inventory (`title`, `author`, `genre`, `publication_date`, `isbn`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.author,
    req.body.genre,
    req.body.publication_date,
    req.body.isbn,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.send("book has been created successfully");
  });
});

app.listen(8800, () => {
  console.log("Listening on http://localhost:8800");
});
