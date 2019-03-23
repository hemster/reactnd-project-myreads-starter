import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooksScreen from './ListBooksScreen'
import SearchBooksScreen from './SearchBooksScreen'

class BooksApp extends React.Component {

  state = {
    bookshelves: [],
  }

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = () => {
    BooksAPI.getAll().then(books => {
      this.convertBooksToBookshelves(books);
    });
  }

  convertBooksToBookshelves = (books) => {
    var currentlyReadingBooks = [];
    var wantToReadBooks = [];
    var readBooks = [];
    books.forEach(function (book, index) {
      if (book.shelf === "currentlyReading") {
        currentlyReadingBooks.push(book);
      } else if (book.shelf === "wantToRead") {
        wantToReadBooks.push(book);
      } else if (book.shelf === "read") {
        readBooks.push(book);
      }
    });

    let currentlyReading = {
      title: 'currentlyReading',
      books: currentlyReadingBooks
    }

    let wantToRead = {
      title: 'wantToRead',
      books: wantToReadBooks
    }

    let read = {
      title: 'read',
      books: readBooks
    }

    this.setState({ 
      bookshelves: [currentlyReading, wantToRead, read],
      books: books
    })
  }

  handleChangeBookShelf = (book, bookShelf, ) => {
      BooksAPI.update(book, bookShelf).then(bookshelves => {
        this.getAllBooks();
      });
  }

  render() {
    const { 
      books,
      bookshelves, 
     } = this.state;
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooksScreen
            handleChangeBookShelf={this.handleChangeBookShelf}
            books={books}
          />
        )} />
        <Route exact path='/' render={() => (
          <ListBooksScreen
            bookshelves={bookshelves}
            handleChangeBookShelf={this.handleChangeBookShelf}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
