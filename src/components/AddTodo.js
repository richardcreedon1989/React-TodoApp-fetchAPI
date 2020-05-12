import React, { Component } from "react";
import PropTypes from "prop-types"
export class AddTodo extends Component {
  state = {
    title: "",
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state.title);
    this.setState({ title: "" });
  };
  onChange = (e) => {
    this.setState({
      //   title: e.target.value,
      [e.target.name]: e.target.value, //[] allows you to have multi fields values got from on change
    });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} style={{ display: "flex" }}>
          <input
            type="text"
            name="title"
            style={{ flex: "10", padding: "5px" }}
            placeholder="Add Todo"
            value={this.state.title}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="submit"
            className="btn"
            style={{ flex: "1" }}
          />
        </form>
      </div>
    );
  }
}

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default AddTodo;
