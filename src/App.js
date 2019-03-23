import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooksScreen from './ListBooksScreen'
import SearchBooksScreen from './SearchBooksScreen'
class BooksApp extends React.Component {

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    bookshelves: [],
    showSearchPage: false
  }

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = () => {
    console.log("getAllBooks");
    BooksAPI.getAll().then(books => {
      this.convertBooksToBookshelves(books);
    });
  }

  handleShowSearchPage = () => {
    this.setState({ showSearchPage: true })
  }

  handleHideSearchPage = () => {
    this.setState({ showSearchPage: false })
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
      console.log(bookShelf);
      console.log(book);

      BooksAPI.update(book, bookShelf).then(bookshelves => {
        console.log(bookshelves);
        this.getAllBooks();
      });
  }

  render() {
    const { 
      books,
      bookshelves, 
      showSearchPage,
     } = this.state;
    return (
      <div className="app">
        {showSearchPage ? (
          <SearchBooksScreen
            hideSearchPage={this.handleHideSearchPage}
            handleChangeBookShelf={this.handleChangeBookShelf}
            books={books}
          />
        ) : (
          <ListBooksScreen
            bookshelves={bookshelves}
            showSearchPage={this.handleShowSearchPage}
            handleChangeBookShelf={this.handleChangeBookShelf}
          />
        )}
      </div>
    )
  }
}

export default BooksApp
