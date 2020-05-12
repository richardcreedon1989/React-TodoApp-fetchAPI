import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import About from "./components/pages/About";
// import uuid from "react-uuid";
import axios from "axios";

class App extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((res) => this.setState({ todos: res.data }));
  }

  //Toggle Complete
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed; //to toggle on and off
        }
        return todo;
      }),
    });
  };

  delTodo = async (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res =>
        this.setState({
          todos: this.state.todos.filter((todo) => {
            if (todo.id !== id) {
              return todo;
            } else {
              return null;
            }
          }),
        })
      );
  }

  addTodo = async (title) => {
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title: title,
        completed: false,
      })
      .then((res) =>
        this.setState({
          todos: [...this.state.todos, res.data],
        })
      );
  };

  // delTodo = (id) => {
  //   this.setState({
  //     todos: this.state.todos.filter((todo) => {
  //       if (todo.id !== id) {
  //         return todo;
  //       } else {
  //         return null;
  //       }
  //     }),
  //   });
  // };

  // addTodo = (title) => {  //How to add to the local state and UI
  //   const newTodo = {
  //     title: title,
  //     id: uuid(),
  //     completed: false,
  //   };
  //   this.setState({
  //     todos: [...this.state.todos, newTodo],
  //   });
  // };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            ></Route>
            <Route path="/about" component={About}></Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;