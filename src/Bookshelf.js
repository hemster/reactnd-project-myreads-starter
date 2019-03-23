import React from 'react'
import './App.css'
import PropTypes from 'prop-types';

import Book from './Book'

const Bookshelf = (props) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{props.title}</h2>
        <div className="bookshelf-books">
        <ol className="books-grid">
        { props.books.map((book, i) => (
            <li key={i}>
                <Book 
                    title={book.title}
                    authors={book.authors}
                    imageURLs={book.imageLinks}
                    bookShelf={book.shelf}
                    handleChangeBookShelf={ (event) => props.handleChangeBookShelf(book, event.target.value)}
                />
            </li>
            ))
        }
        </ol>
        </div>
    </div>
);

Bookshelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleChangeBookShelf: PropTypes.func.isRequired,
};

export default Bookshelf;
