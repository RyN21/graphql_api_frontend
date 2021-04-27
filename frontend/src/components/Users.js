import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import UserAvatar from './UserAvatar';
import CreateUser from './CreateUser';

const GET_USERS = gql `
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

function Users({ selectUser }) {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return 'Loading...';
  if (error) return `Error ${error.message}`;

  function updateUser(cache, {data: { createUser }}) {
    const { users } = cache.readQuery({ query: GET_USERS });
    cache.writeQuery({
      query: GET_USERS,
      data: { users: users.concat([createUser.user]) },
    });
  }

  return(
    <div className="flex flex-wrap items-center pb-16">
      {data.users.map(user => (
        <div key={user.id} className="lg:w-1/3 w-full p-4 text-center inline" onClick={selectUser.bind
        (this, user)}>
          <UserAvatar user={user} />
        </div>
      ))}

      <div className="lg:m-4 lg:w-1/4 w-full rounded shadow-lg">
        <CreateUser onCreateUser={updateUser} />
      </div>
    </div>
  )
}

export default Users;
