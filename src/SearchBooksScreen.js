import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types';
import Book from './Book'

class SearchBooksScreen extends React.Component {
    state = {
        value: '',
        searchResults: [],
    }

    componentDidUpdate(prevProps) {
        if(this.props.books !== prevProps.books) {
            this.appendBookShelf(this.state.searchResults);
        }
    }

    handleChange = (event) => {
        const query = event.target.value;
        this.setState({value: query});
        BooksAPI.search(query).then(searchResults => {
            if (!searchResults.error) {
                this.appendBookShelf(searchResults);
            } else {
                this.setState({searchResults: []});
            }
         }).catch(function(error) {

        });
    }

    appendBookShelf = (searchResults) => {
        const { books } = this.props;

        var appendedBooks = searchResults.map((searchResult) => {
            var book = books.find((b) => b.id === searchResult.id);
            console.log("book: " + book);
            return book || searchResult;
        });

        this.setState({searchResults: appendedBooks});
    }

    render() {
        const { searchResults, value } = this.state;
        const { hideSearchPage, handleChangeBookShelf } = this.props; 
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={hideSearchPage}>Close</button>
                    <div className="search-books-input-wrapper">
                        {/*
                            NOTES: The search from BooksAPI is limited to a particular set of search terms.
                            You can find these search terms here:
                            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                            you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input type="text" placeholder="Search by title or author" value={value} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    { searchResults.map((book, i) => (
                        <li key={i}>
                            <Book 
                                title={book.title}
                                authors={book.authors}
                                imageURLs={book.imageLinks}
                                bookShelf={book.shelf}
                                handleChangeBookShelf={ (event) => handleChangeBookShelf(book, event.target.value)}
                            />
                        </li>
                        ))
                    }
                    </ol>
                </div>
            </div>
        )
    }
}

SearchBooksScreen.propTypes = {
    hideSearchPage: PropTypes.func.isRequired,
    handleChangeBookShelf: PropTypes.func.isRequired,
    books: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default SearchBooksScreen;
