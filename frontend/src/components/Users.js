import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
// import UserAvatar from './UserAvatar';
// import CreateUser from './CreateUser';

const GET_USER = gql `
  {
    users {
      id
      name
      username
      email
      postsCount
    }
  }
`;
