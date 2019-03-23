import React from 'react'
import './App.css'
import PropTypes from 'prop-types';
import Bookshelf from './Bookshelf'

const ListBooksScreen = (props) => (
    <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
                {props.bookshelves.map((bookshelf, i) => (
                    <Bookshelf
                        key={i}
                        title={bookshelf.title}
                        books={bookshelf.books}
                        handleChangeBookShelf={props.handleChangeBookShelf}
                    />
                ))}
            </div>
        </div>
        <div className="open-search">
            <button onClick={props.showSearchPage}>Add a book</button>
        </div>
    </div>
);

ListBooksScreen.propTypes = {
    bookshelves: PropTypes.arrayOf(PropTypes.object).isRequired,
    showSearchPage: PropTypes.func.isRequired,
    handleChangeBookShelf: PropTypes.func.isRequired
};

export default ListBooksScreen;
