
import React, { useState } from "react";
import BookCard from "./components/BookCard.jsx";
import "./App.css";

function App() {
  const [query, setQuery] = useState("Harry Potter");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const searchBooks = async (index = 0) => {
    setLoading(true);
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${index}&maxResults=12`
    );
    const data = await res.json();
    setBooks(data.items || []);
    setStartIndex(index);
    setLoading(false);
  };

  return (
    <div className="book-app">
      <h1>📚 Book Search</h1>

      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchBooks(0)}
          placeholder="Search books..."
        />
        <button onClick={() => searchBooks(0)}>Search</button>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : (
        <>
          <div className="book-list">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <div className="pagination">
            <button onClick={() => searchBooks(startIndex - 12)} disabled={startIndex === 0}>
              ◀ Prev
            </button>
            <button onClick={() => searchBooks(startIndex + 12)}>Next ▶</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
