import React from "react";

function BookCard({ book }) {
  const info = book.volumeInfo;
  return (
    <div className="book-card">
      <img
        src={info.imageLinks?.thumbnail || "https://via.placeholder.com/128x195?text=No+Image"}
        alt={info.title}
      />
      <h3>{info.title}</h3>
      <p>{info.authors?.join(", ")}</p>
      <a href={info.previewLink} target="_blank" rel="noopener noreferrer">
        📖 Preview
      </a>
    </div>
  );
}

export default BookCard;