import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types';
import Book from './Book'

class SearchBooksScreen extends React.Component {
    state = {
        value: '',
        books: []
    }

    handleChange = (event) => {
        // TOFIX: Got error when type fast
        const query = event.target.value;
        this.setState({value: query});
        BooksAPI.search(query).then(books => {
            if (!books.error) {
                this.setState({books: books});
            } else {
                this.setState({books: []});
                console.log(books.error);
            }
         }).catch(function(error) {
            console.log(error);
        });
    }

    render() {
        const { books, value } = this.state;
        const { hideSearchPage } = this.props; 
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
                    { books.map((book, i) => (
                        <li key={i}>
                            <Book 
                                title={book.title}
                                authors={book.authors}
                                imageURL={book.imageLinks.thumbnail}
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
};

export default SearchBooksScreen;
