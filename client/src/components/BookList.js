import React,{Component} from 'react';
import {graphql} from 'react-apollo';
import {getBooksQuery} from '../queries/queries';
import BookDetails from './BookDetails'

class BookList extends Component {
  state={
    selectedBookId :""
  }
  selectBook = (id)=>{
    this.setState(()=>({
      selectedBookId : id
    }))
  }
  displayBooks = ()=>{
      const {data} = this.props;
      if(data.loading){
        return(
          <div>Loading...</div>
        )
      }
      else{
        return data.books.map(book=>{
          return <li key={book.id} onClick={this.selectBook.bind(this,book.id)}>{book.name}</li>
        })
      }
  }
  render(){
    const {selectedBookId} = this.state;
    return (
      <div id='mai'>
        <ul id ="book-list">
          {this.displayBooks()}
        </ul>
          <BookDetails bookId={selectedBookId}/>
      </div>
    );
  }

}

export default graphql(getBooksQuery,{

})(BookList);
