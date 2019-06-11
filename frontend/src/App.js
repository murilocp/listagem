import React, { Component } from 'react';
import axios from 'axios';
import './App'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

class App extends Component {

   state = {
     newPostContent: '',
     posts: [],
   };

   async componentDidMount() {
     const {data: posts} = await api.get('/posts')

     this.setState({ posts })
   }

   handleDelete = async (id) => {
     await api.delete(`/posts/${id}`)

     this.setState({posts: this.state.posts.filter(item => item.id !== id)})
   }

   handlePostSave = async (e) => {
     e.preventDefault();

     const { data: post} = await api.post('/posts', { content: this.state.newPostContent });
     
     this.setState({ posts: [ ... this.state.posts, post ], newPostContent: '' })
   };

  render() {
    return <div className="App">
      <Card className="p-3" style={{ width: '50rem' }}>
      <Card.Title><h1>Listagem e cadastro de itens</h1></Card.Title>
      <Card.Body>
      <Form onSubmit={this.handlePostSave}>
        <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows="3" placeholder="Escreva aqui..."
              onChange={e => this.setState({newPostContent: e.target.value})}
              value={this.state.newPostContent}
            />
        </Form.Group>
        <Button type="submit">Postar</Button>
      </Form>
      <br />
      <ListGroup>
        { this.state.posts.map(post => (
          <h6 key={post.id}>
            <ListGroupItem>
              {post.content}
              <div onClick={() => this.handleDelete(post.id)} className="glyphicon glyphicon-trash pull-right"></div>
            </ListGroupItem>
          </h6>
        )) }
      </ListGroup>
      </Card.Body>
      </Card>
    </div>;
  }
}

export default App;
