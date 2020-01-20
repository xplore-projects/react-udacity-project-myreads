import React, { Component } from "react";
import { Link } from "react-router-dom";

import BookShelf from "./BookShelf";
import PropTypes from "prop-types";

// HOME Component is our main Page
class Home extends Component {
  // Returning proper books on the adequate shelves
  getBookOnShelf = shelf => {
    let bookOnShelf = [];
    this.props.books.forEach(book => {
      if (book.shelf === shelf) bookOnShelf.push(book);
    });
    return bookOnShelf;
  };

  // Rendering BookShelf's
  render() {
    const { shelves, onChangingShelf } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf
            title="currently Reading"
            shelves={shelves}
            books={this.getBookOnShelf("currentlyReading")}
            onChangingShelf={onChangingShelf}
          />
          <BookShelf
            title="Want to Read"
            books={this.getBookOnShelf("wantToRead")}
            onChangingShelf={onChangingShelf}
          />
          <BookShelf
            title="read"
            books={this.getBookOnShelf("read")}
            onChangingShelf={onChangingShelf}
          />

          <div className="open-search">
            <Link to="/search">
              <button>Add a book</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  books: PropTypes.array.isRequired,

  shelves: PropTypes.shape({
    currentlyReading: PropTypes.array.isRequired,
    wantToRead: PropTypes.array.isRequired,
    read: PropTypes.array.isRequired
  }).isRequired,
  onChangingShelf: PropTypes.func.isRequired
};

export default Home;
