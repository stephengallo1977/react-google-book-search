import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import Card from "../components/Card";
import BookImg from "../components/BookImg";
import { Input, FormBtn } from "../components/Form";
import Fade from "react-reveal/Fade";

// Book results from the google API need to be formatted so that they can be transmuted to the state of the search page
const formatBookResults = apiBookResults => {
  const bookArray = [];

  apiBookResults.map(book => {
    // Formatted book object for passing down props to the stateless book card component
    const formattedBook = {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors
        ? book.volumeInfo.authors
        : ["Could not find author."],
      description: book.volumeInfo.description,
      googleBookId: book.id,
      thumbnail: book.volumeInfo.imageLinks
        ? book.volumeInfo.imageLinks.thumbnail
        : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/170px-No_image_available.svg.png",
      link: book.volumeInfo.canonicalVolumeLink,
      subtitle: book.volumeInfo.subtitle,
      publishedDate: book.volumeInfo.publishedDate
    };

    bookArray.push(formattedBook);
    return bookArray;
  });
  return bookArray;
};

class Search extends Component {
  // Initial state is an empty array for holding book objects
  state = {
    books: []
  };

  // SaveBook method hits the savebook API route, which saves that book to the saved section of the db
  saveBook = event => {
    const chosenBook = this.state.books.find(
      book => book.googleBookId === event.target.id
    );
    API.saveBook(chosenBook)
      .then(alert("Book saved to library."))
      .catch(err => console.log(err));
  };

  // Handler for keeping track of user input on the form
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // Handler for form submission that hits my getGoogleBooks API route
  handleFormSubmit = event => {
    event.preventDefault();
    console.log("handle form");
    API.getGoogleBooks(this.state.title)
      .then(res => {
        const formattedArray = formatBookResults(res.data.items);
        this.setState({ books: formattedArray });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Fade top>
        <Container fluid>
          <Row>
            <Col size="sm-12">
              <Jumbotron>
                <BookImg />
                <h1>Welcome to Google Book Search</h1>

                <h5>Please enter a book title below to begin searching...</h5>
              </Jumbotron>
              <form>
                <Input
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  name="title"
                  placeholder="e.g. Lord of the Flies"
                />
                <FormBtn onClick={this.handleFormSubmit}>Search</FormBtn>
              </form>
            </Col>
          </Row>
          <Row>
            <Col size="sm-12">
              {this.state.books.length ? (
                <Card
                  books={this.state.books}
                  buttonAction={this.saveBook}
                  buttonType="btn btn-success mt-2"
                  buttonText="Save Book"
                />
              ) : (
                <div className="mx-auto">
                  <h3 className="mx-auto text-center">
                    Nothing to display yet!
                  </h3>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </Fade>
    );
  }
}

export default Search;
