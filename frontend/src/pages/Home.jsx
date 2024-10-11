import React from "react";

export default function Home(){
    return(
        <div className="home container">
                <h1>Welcome To <span>BookHub</span></h1>
                <p>Your One Stop Destination for All Your Favorite Books</p>
                <div className="cta">
                    <a href="/books">Browse Books</a>
                    <a href="/add">Add Book</a>
            </div> 
        </div>
    )
}