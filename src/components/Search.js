import React, { Component } from "react";
import { Link } from "react-router-dom";

import * as BooksAPI from "../BooksAPI";
import PropTypes from "prop-types";
import Book from "./Book";

// SEARCH Component is our search Page
class Search extends Component {
  state = {
    query: "",
    results: []
  };

  // Updating query
  updateSearchQuery(query) {
    if (query.length > 0) {
      this.setState(() => ({
        query,
        results: []
      }));
      this.searchingBooks(query);
    } else {
      this.clearSearchQuery();
    }
  }

  // Searching book and updating the shelf
  searchingBooks = async query => {
    try {
      if (query.length > 0) {
        const searchResults = await BooksAPI.search(query);
        if (query === this.state.query) {
          this.setState({ results: this.updateShelves(searchResults) });
        }
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  // Clearing the search field
  clearSearchQuery = () => {
    this.setState({
      query: "",
      results: []
    });
  };

  // Updating the shelf & state with the search results
  updateShelves(searchResults) {
    try {
    } catch (err) {
      console.log("Error: ", err);
    }
    if (!searchResults.error) {
      const books = this.props.books;
      const updateState = searchResults.filter(result =>
        books.find(book => {
          if (book.id === result.id) {
            result.shelf = book.shelf;
            return result;
          }
        })
      );
      books.concat(updateState);
      return searchResults;
    }
  }

  // Rendering our search page with adequate results
  render() {
    const { query, results } = this.state;
    const { onChangingShelf, shelves } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search" onClick={this.clearSearchQuery}>
              Close
            </button>
          </Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={query}
              placeholder="Search by title or author"
              onChange={event => this.updateSearchQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {results.length > 0 &&
              results.map(book => (
                <Book
                  key={book.id}
                  shelves={shelves}
                  book={book}
                  onChangingShelf={onChangingShelf}
                />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.shape({
    currentlyReading: PropTypes.array.isRequired,
    wantToRead: PropTypes.array.isRequired,
    read: PropTypes.array.isRequired
  }).isRequired,
  onChangingShelf: PropTypes.func.isRequired
};

export default Search;
