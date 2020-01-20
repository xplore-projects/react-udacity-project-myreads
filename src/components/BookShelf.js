import React from "react";

import PropTypes from "prop-types";
import Book from "./Book";

// Books on shelf is being listed through this BookShelf Component
const BookShelf = props => {
  const { books, title, onChangingShelf } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <Book key={book.id} book={book} onChangingShelf={onChangingShelf} />
          ))}
        </ol>
      </div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.any.isRequired,
  onChangingShelf: PropTypes.func.isRequired
};
export default BookShelf;
