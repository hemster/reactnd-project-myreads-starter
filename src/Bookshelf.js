import React from 'react'
import './App.css'
import PropTypes from 'prop-types';

import Book from './Book'

const Bookshelf = (props) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{props.title}</h2>
        <div className="bookshelf-books">
        <ol className="books-grid">
        { props.books.map((book) => (
            <li>
                <Book 
                    title={book.title}
                    authors={book.authors}
                    cover={book.cover}
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
};

export default Bookshelf;
