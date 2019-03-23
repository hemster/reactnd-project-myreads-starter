import React from 'react'
import './App.css'
import PropTypes from 'prop-types';

const Book = (props) => (
    <div className="book">
        <div className="book-top">
        {/* TOFIX: backgroundImage without width and height will not show so have to hard code it here */}
        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${props.imageURL})` }}></div>
        <div className="book-shelf-changer">
            <select>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
            </select>
        </div>
        </div>
        <div className="book-title">{props.title}</div>
        <div className="book-authors">{props.authors}</div>
    </div>
);

Book.propTypes = {
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
    imageURL: PropTypes.string.isRequired,
};

export default Book;