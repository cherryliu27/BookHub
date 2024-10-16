import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Add(){

    const navigate = useNavigate();

    // Predefined genres 
    const genres = [
        "Fiction", "Mystery", "Romance", "Science Fiction", "Fantasy", "Thriller", "Historical Fiction", "Non-Fiction", "Horror"];

    // Set State variables for book values
    const [book, setBook] = useState({
        title: "",
        author: "",
        genre: "",
        publication_date: "",
        isbn: ""
    });

    // State Variables for error messages
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors(prev => ({...prev, [e.target.name]: ""}));
        // console.log(book);
        // console.log(errors);
    };

    const handleClick = async (e) => {
        e.preventDefault();

        const validationError = {};
        // VALIDATION
        // Validation on empty fields
        if (!book.title) {validationError.title = "Title is required."};
        if (!book.author) {validationError.author = "Author is required."};
        if (!book.genre) {validationError.genre = "Genre is required."};

        //Validation on Publication date
        if (!book.publication_date) {validationError.publication_date = "Publication Date is required." ;}
        else if (new Date(book.publication_date) > new Date()) {validationError.publication_date = "Date cannot be in the future."}

        // Validation on ISBN
        if(!book.isbn){validationError.isbn = "ISBN is required."} 
        else if (!/^\d+$/.test(book.isbn)) {validationError.isbn = "ISBN must contain only numbers."}
        else if (book.isbn.length !== 13) {validationError.isbn = "ISBN must be exactly 13 digits."}

        // Check if there are any errors
        if (Object.keys(validationError).length > 0) {setErrors(validationError);return;} 

        try{
            const res = await fetch("http://localhost:8800/books", {method: "POST", headers: {"Content-Type": "Application/json"}, body: JSON.stringify(book)});
            
            if (!res.ok){
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            // Return to Books page after successfully added book to database
            navigate("/books");
            } catch(err){
                console.log(err)
            }
    }

    return(
        <div className="add container">
            <h1>Add new book</h1>
            <p>Add a new book to your collection!</p>
            <div className="add-form">
                <div class="add-field">
                    <label htmlFor="title">Title:<span> *</span></label>
                    <input type="text" placeholder="Enter Book Title" name="title" onChange={handleChange}/>
                    <span class="validation">{errors.title}</span>
                </div>
                <div class="add-field">
                    <label htmlFor="author">Author:<span> *</span></label>
                    <input type="text" placeholder="Enter Author Name" name="author" onChange={handleChange}/>
                    <span class="validation">{errors.author}</span>
                </div>
                <div class="add-row">
                    <div class="add-field">
                        <label htmlFor="genre">Genre:<span> *</span></label>
                        <select name="genre" id="genre" onChange={handleChange} value={book.genre}>
                            <option value="">Select Genre</option>
                            {genres.map((genre)=>(
                                <option value={genre}>{genre}</option>
                            ))}
                        </select>
                        <span class="validation">{errors.genre}</span>
                    </div>
                    <div class="add-field">
                        <label htmlFor="publication_date">Publication Date:<span> *</span></label>
                        <input type="date" name="publication_date" onChange={handleChange}/>
                        <span class="validation">{errors.publication_date}</span>
                    </div> 
                </div>               
                <div class="add-field">
                    <label htmlFor="isbn">ISBN:<span> *</span></label>
                    <input type="text" placeholder="Enter 13 digit ISBN" name="isbn" maxLength="13" pattern="[0-9]{13}" onChange={handleChange}/>
                    <span class="validation">{errors.isbn}</span>
                </div>
            </div>
                <button onClick={handleClick}>Add Book</button>
        </div>
    )
}