import React from "react";

function UserRow({ users }) {
  return users.map((user) => {
    return (
      <div
        key={user.id}
        className="flex space-x-4 border divide-x-4 items-center"
      >
        <div>{user.id}</div>
        <div>{user.first_name}</div>
        <div>{user.last_name}</div>
        <div>{user.gender}</div>
        <div>{user.age}</div>
        <div>{user.email}</div>
      </div>
    );
  });
}

export default UserRow;
