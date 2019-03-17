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
    let promise = BooksAPI.getAll()
  
    promise.then(books => {
      this.setState({
        books: books
      }, () => {
        console.log(this.state.books);
      })
    });
  }

  handleShowSearchPage() {
    this.setState({ showSearchPage: true })
  }

  handleHideSearchPage() {
    this.setState({ showSearchPage: false })
  }

  render() {
    const { 
      bookshelves, 
      showSearchPage,
     } = this.state;
    return (
      <div className="app">
        {showSearchPage ? (
          <SearchBooksScreen
            books={[]}
            hideSearchPage={this.handleHideSearchPage.bind(this)}
          />
        ) : (
          <ListBooksScreen
            bookshelves={bookshelves}
            showSearchPage={this.handleShowSearchPage.bind(this)}
          />
        )}
      </div>
    )
  }
}

export default BooksApp
