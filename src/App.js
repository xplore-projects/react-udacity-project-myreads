import React from "react";
import { Switch, Route } from "react-router-dom";

import * as BooksAPI from "./BooksAPI";
import Home from "./components/Home";
import Search from "./components/Search";

import "./App.css";

// MyRead App main component
class BooksApp extends React.Component {
  // Books & Shelves states
  state = {
    books: [],
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  };

  // Inserting BookIds on appropriate book shelves Object
  stateBooksInit = shelves => {
    const { books } = this.state;
    if (books && books.length) {
      books.forEach(book => {
        shelves[book.shelf].push(book.id);
      });
    }
    this.setState({ shelves });
  };

  // Move books to differents shelves and update states
  handleChangingShelf = async (book, shelf) => {
    try {
      await BooksAPI.update(book, shelf);
      if (shelf === "none") {
        this.setState(prevState => ({
          books: prevState.books.filter(b => b.id !== book.id)
        }));
      } else {
        book.shelf = shelf;
        this.setState(prevState => ({
          books: prevState.books.filter(b => b.id !== book.id).concat(book)
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Securing component before API calls or any inititiation needed
  componentDidMount = async () => {
    try {
      const booksArr = await BooksAPI.getAll();
      this.setState(() => ({
        books: booksArr
      }));
      this.stateBooksInit(this.state.shelves);
    } catch (err) {
      console.log(err);
    }
  };

  // Rendering two main views: Home & Search
  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home
                books={this.state.books}
                shelves={this.state.shelves}
                onChangingShelf={this.handleChangingShelf}
              />
            )}
          ></Route>
          <Route
            path="/search"
            render={() => (
              <Search
                books={this.state.books}
                shelves={this.state.shelves}
                onChangingShelf={this.handleChangingShelf}
              />
            )}
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
