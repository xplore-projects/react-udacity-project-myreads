import React, { Component } from "react";
import PropTypes from "prop-types";

// List Book cover, author name and title
class Book extends Component {
  // Getting the adequate shelf name
  getCurrentShelf = () => {
    let currentShelf = this.props.book.shelf;
    return currentShelf ? currentShelf : "none";
  };

  // Calling and executing method described earlier
  handleChange = event => {
    this.props.onChangingShelf(this.props.book, event.target.value);
  };

  // Rendering book
  render() {
    const { book } = this.props;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${
                  book.imageLinks ? book.imageLinks.thumbnail : ""
                })`
              }}
            ></div>
            <div className="book-shelf-changer">
              <select
                onChange={this.handleChange}
                defaultValue={this.getCurrentShelf()}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {book.authors ? book.authors.join(", ") : "unkown author"}
          </div>
        </div>
      </li>
    );
  }
}

Book.propTypes = {
  book: PropTypes.any.isRequired,
  onChangingShelf: PropTypes.func.isRequired
};
export default Book;
