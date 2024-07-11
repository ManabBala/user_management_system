import React, { useEffect, useState } from "react";
import axios from "axios";
import AddUserModal from "../../Components/AddUserModal";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("id");
  const [order, setOrder] = useState("ASC");
  const [limit, setLimit] = useState(15);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [search, sort, order, limit, offset]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users", {
        params: { search, sort, order, limit, offset },
      });
      setUsers(response.data.rows);
      setTotal(response.data.count);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setOffset(0);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setOrder(order === "ASC" ? "DESC" : "ASC");
    setOffset(0);
  };

  const handlePageChange = (newOffset) => {
    setOffset(newOffset);
  };

  const totalPages = Math.ceil(total / limit);

  const getPaginationItems = () => {
    const currentPage = offset / limit + 1;
    const paginationItems = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(i);
      }
    } else {
      paginationItems.push(1);
      if (currentPage > 3) {
        paginationItems.push("...");
      }
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      for (let i = startPage; i <= endPage; i++) {
        paginationItems.push(i);
      }
      if (currentPage < totalPages - 2) {
        paginationItems.push("...");
      }
      paginationItems.push(totalPages);
    }
    return paginationItems;
  };

  const handleAddUser = async (newUser) => {
    console.log("New user:", newUser);
    try {
      // Perform API call to add user
      const response = await axios.post(
        "http://localhost:3000/api/users",
        newUser,
      );

      fetchUsers();
      console.log(response);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="">
        <button
          onClick={toggleModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add User
        </button>
        <AddUserModal
          isOpen={showModal}
          onClose={toggleModal}
          onAddUser={handleAddUser}
        />
      </div>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search users..."
        className="border rounded p-2 my-4 w-full"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => handleSortChange("id")}
              >
                ID
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => handleSortChange("first_name")}
              >
                First Name
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => handleSortChange("last_name")}
              >
                Last Name
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => handleSortChange("email")}
              >
                Email
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => handleSortChange("gender")}
              >
                Gender
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => handleSortChange("age")}
              >
                Age
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{user.id}</td>
                <td className="py-2 px-4 border-b">{user.first_name}</td>
                <td className="py-2 px-4 border-b">{user.last_name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.gender}</td>
                <td className="py-2 px-4 border-b">{user.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => handlePageChange(0)}
          className="mx-1 px-3 py-1 border rounded disabled:opacity-50"
          disabled={offset === 0}
        >
          &lt;&lt;
        </button>
        <button
          onClick={() => handlePageChange(Math.max(0, offset - limit))}
          className="mx-1 px-3 py-1 border rounded disabled:opacity-50"
          disabled={offset === 0}
        >
          &lt;
        </button>
        {getPaginationItems().map((item, index) => (
          <button
            key={index}
            onClick={() =>
              typeof item === "number"
                ? handlePageChange((item - 1) * limit)
                : null
            }
            className={`mx-1 px-3 py-1 border rounded ${
              offset === (item - 1) * limit
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            } ${item === "..." ? "cursor-default" : ""}`}
            disabled={item === "..."}
          >
            {item}
          </button>
        ))}
        <button
          onClick={() =>
            handlePageChange(Math.min(offset + limit, (totalPages - 1) * limit))
          }
          className="mx-1 px-3 py-1 border rounded disabled:opacity-50"
          disabled={offset >= (totalPages - 1) * limit}
        >
          &gt;
        </button>
        <button
          onClick={() => handlePageChange((totalPages - 1) * limit)}
          className="mx-1 px-3 py-1 border rounded disabled:opacity-50"
          disabled={offset >= (totalPages - 1) * limit}
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default UsersTable;
