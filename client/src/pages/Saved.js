import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import BookImg from "../components/BookImg";
import API from "../utils/API";
import Fade from 'react-reveal/Fade';

// The 'saved' page holds any saved books the user might have, or displays a message if they haven't saved anything yet
class Saved extends Component {
  state = {
    books: []
  };

  // Utilize our API to get saved books from the database
  getSavedBooks = () => {
    API.getSaved()
      .then(res => this.setState({books: res.data}))
      .catch(err => console.log(err))
  };  

  // Run the get saved books function when component mounts
  componentDidMount() {
    this.getSavedBooks();
  };

  // Method to delete a book from the database through the delete API route
  deleteBook = event => {
    API.deleteBook(event.target.id)
      .then(res => this.getSavedBooks())
      .catch(err => console.log(err))
  };

  render() {
    return (
      <Container fluid>
        <Fade top>
        <Row>
          <Col size="md-12">
            <Jumbotron>
                <BookImg />
                <h1>Welcome to Stephen's Google Book Search</h1>
                
                <h5>Your Saved Book Collection:</h5>
            </Jumbotron>
          </Col>
        </Row>
        </Fade>
        <Row>
          <Col size="sm-12">
            {this.state.books.length ? (
              <Card
                books={this.state.books}
                buttonAction={this.deleteBook}
                buttonType="btn btn-danger mt-2"
                buttonText="Delete Book"
              />
            ) : (
              <div className="mx-auto">
                  <h3 className="mx-auto text-center">There are no books saved yet, please go to the search page and this saves the books there!</h3>
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col size="md-2 mx-auto">
            <Link to="/" className="mx-auto text-center">← Back to Search</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Saved;
