import React from "react";
import "./style.css";
import Slide from 'react-reveal/Slide';

// Card props are passed down from the formatted book object on the search page
function Card(props) {
  return (
    <Slide left>
    <div className="row mb-5">
      <div className="col-lg-12">
        {/* map over the books from the books state that was passed down to create cards for each book in the array */}
        {props.books.map(book => (
          <div className="card mt-4" key={book._id ? book._id : book.googleBookId}>
            <div className="card-body">
              <h5 className="card-title">{book.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{book.subtitle}</h6>
              <div className="media">
                <img src={book.thumbnail} className="align-self-center mr-3" alt="Book cover"/>
                <div className="media-body">
                  <h6 className="mt-0">{book.authors.join(', ')}</h6>
                  <p className="mb-0">{book.description}</p>
                  <p className="mb-2">
                    <small className="text-muted">Published: {book.publishedDate}</small>
                  </p>
                </div>
              </div>
              <a className="btn btn-info mr-1 mt-2" href={book.link} target="_blank"
                 rel="noopener noreferrer">View Book</a>
              <button className={props.buttonType}
                      onClick={props.buttonAction}
                      id={book._id ? book._id : book.googleBookId}
              >
                {props.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Slide>
  )
}


export default Card;
