import { useState, useEffect } from "react";
import "./Users.css";

const Users = () => {
  const [selectedTab, setSelectedTab] = useState("Instructor");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/admin/${selectedTab.toLowerCase()}s`);
      const data = await response.json();

      if (Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        setUsers([]);
        setError("Unexpected response format.");
      }
    } catch (err) {
      setError("Failed to load users.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [selectedTab]);

  const handleAddUser = async () => {
    if (!name) return alert("Enter a name!");
    try {
      const response = await fetch("http://localhost:5000/api/admin/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role: selectedTab.toLowerCase() }),
      });
      const data = await response.json();
      if (data.user) {
        setUsers([...users, data.user]);
        setName("");
      } else {
        alert("Failed to add user.");
      }
    } catch (err) {
      alert("Error adding user!");
    }
  };

  const handleUpdateUser = async () => {
    if (!editingUser || !name) return alert("Enter a new name!");
    try {
      const response = await fetch(`http://localhost:5000/api/admin/update/${editingUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      setUsers(users.map((user) => (user._id === editingUser._id ? data.user : user)));
      setEditingUser(null);
      setName("");
    } catch (err) {
      alert("Error updating user!");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await fetch(`http://localhost:5000/api/admin/delete/${id}`, { method: "DELETE" });
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      alert("Error deleting user!");
    }
  };

  return (
    <div className="users-container">
      <div className="tabs">
        <button
          className={selectedTab === "Instructor" ? "active" : ""}
          onClick={() => setSelectedTab("Instructor")}
        >
          Instructor
        </button>
        <button
          className={selectedTab === "Student" ? "active" : ""}
          onClick={() => setSelectedTab("Student")}
        >
          Student
        </button>
      </div>

      <div className="add-user">
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {editingUser ? (
          <button className="update-btn" onClick={handleUpdateUser}>
            Update
          </button>
        ) : (
          <button className="add-btn" onClick={handleAddUser}>
            Add User +
          </button>
        )}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <table className="users-table">
        <thead>
          <tr>
            <th>{selectedTab}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) &&
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td className="edit-actions">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditingUser(user);
                      setName(user.username);
                    }}
                  >
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteUser(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
