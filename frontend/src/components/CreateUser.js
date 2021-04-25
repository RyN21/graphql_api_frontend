import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const CREATE_USER = gql `
  mutation CreateUser($name: String!, $email: String!, $username: String!) {
    createUser(input: { name: $name, email: $email, username: $username }) {
      user {
        id
        name
        email
        username
        postsCount
      }
      errors
    }
  }
`;

class CreateUser extends Component {
  state = {
    name: '',
    email: '',
    username: ''
  }

  onSubmit = (e, createUser) => {
    e.preventDefault();
    createUser({ variables: this.state });
    this.setState({ name: '', email: '', username: '' })
  }
}
