import React,{Component} from 'react';
import {graphql,compose} from 'react-apollo';
import {getAuthorsQuery,addBookMutaion,getBooksQuery} from '../queries/queries';


class AddBook extends Component {
  state = {
    name : "",
    genre : "",
    authorId : "",
  }

  handleChange = (e)=>{
    e.persist()
    this.setState(()=>({
      [e.target.id]:e.target.value
    }))
  }

  handleSubmit = (e)=>{
    e.preventDefault();
    const {name,genre,authorId} = this.state;
    this.props.addBookMutaion({
      variables : {name:name,genre:genre,authorId:authorId},
      refetchQueries : [{query:getBooksQuery}]
    });
  }

  displayAuthor = ()=>{
      const data = this.props.getAuthorsQuery;
      if(data.loading){
        return(
          <option disabled >Loading Authors..</option>
        )
      }
      else{
        return data.authors.map(author=>{
          return <option key={author.id} value={author.id}>{author.name}</option>
        })
      }
  }
  render(){
    return (
      <form id="add-book" onSubmit={this.handleSubmit}>

        <div className="field">
          <label>Book name:</label>
          <input type="text" id="name" onChange={this.handleChange}/>
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" id="genre" onChange={this.handleChange} />
        </div>

        <div className="field">
          <label>Author:</label>
          <select id="authorId" onChange={this.handleChange}>
           <option  >Select Authors</option>
            {this.displayAuthor()}
          </select>
        </div>

        <button>+</button>

      </form>
    );
  }

}

export default compose(
  graphql(getAuthorsQuery,{name:'getAuthorsQuery'}),
  graphql(addBookMutaion,{name:'addBookMutaion'})
)(AddBook);
