import React, { useEffect, useState } from "react"
import {CSVLink} from "react-csv";

export default function Books(){

    // Set useState Variables
    const [books, setBooks] = useState([]); 
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [author, setAuthor] =useState("");
    

    // Fetch All List of Books in library from backend
    useEffect(()=>{
        const fetchAllBooks = async() => {
            try{
                const res = await fetch("http://localhost:8800/books");
                if(!res.ok){
                    throw new Error(`Error: ${res.status}`)
                }
                const data = await res.json();
                // Store into State
                setBooks(data);
                console.log(data);
            } catch(err){
                console.log(err)
            }
        }
        fetchAllBooks()
    }, [])

    // Filter out books results that matches user input criteria 
    const filteredBooks = books.filter((book)=> {
        const titleMatch = book.title.toLowerCase().includes(title.toLowerCase());
        const authorMatch = book.author.toLowerCase().includes(author.toLowerCase());
        const genreMatch = genre ? book.genre.toLowerCase() === genre.toLowerCase() : true;
        return (titleMatch && genreMatch && authorMatch);
    })

    // Export function to CSV
    const csvData = filteredBooks.map((book) => {
        const formattedDate = new Date(book.publication_date).toISOString().split('T')[0]; 
        return {
            "Entry ID": book.entry_id,
            Title: book.title,
            Author: book.author,
            Genre: book.genre,
            "Publication Date": formattedDate,
            ISBN: book.isbn,
        };
    });

    // Clear user search input when "Clear" button is clicked
    const clearInput = () => {
        setTitle("");
        setAuthor("");
        setGenre("");
    };


    return (
        <div class="books container">
            <h1>Your Library</h1>
            <p>Explore your current collection of books</p>

            <form class="search-form">
                <div class="search-container">
                <div class="search">
                    <label htmlFor="title">Title:</label>
                    <input type="text" value={title} placeholder="Search Title" onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div class="search">
                    <label htmlFor="author"> Author: </label>
                    <input type="text" value={author} placeholder="Search Author" onChange={(e) => setAuthor(e.target.value)}/>
                </div>
                <div class="search">
                    <label htmlFor="Genre">Genre: </label>
                    <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                        <option value="">Select Genre</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Romance">Romance</option>
                        <option value="Science Fiction">Science Fiction</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Historical Fiction">Historical Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Horror">Horror</option>
                    </select>
                </div>
                </div>
                <div className="booksbtns">
                    <button type="button" onClick={clearInput}>Clear</button>
                    <button type="button" ><CSVLink data={csvData} filename={"books.csv"}>Export</CSVLink></button>
                </div>
            </form>
            <div className="table-responsive">
                <table className="custom-table table">
                    <thead >
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Publication Date</th>
                            <th scope="col">ISBN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.map((book) => (
                            <tr key={book.entry_id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.genre}</td>
                                <td>{book.publication_date}</td>
                                <td>{book.isbn}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredBooks.length === 0 && <h2 class="no-match">No matching results</h2>}

            </div>
        </div>
    )
}
