import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [editingData, setEditingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    department: "",
    hireDate: "",
  });

  useEffect(() => {
    axios
      .get(`${config.apiURL}/get`)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCreate = () => {
    navigate("/create");
  };

  const handleEdit = (employee) => {
    setEditingEmployeeId(employee._id);
    setEditingData({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      position: employee.position,
      department: employee.department,
      hireDate: employee.hireDate,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingData({
      ...editingData,
      [name]: value,
    });
  };
  const handleSave = (id) => {
    axios
      .put(`${config.apiURL}/update/${id}`, editingData)
      .then((response) => {
        setEmployees((prevEmployees) =>
          prevEmployees.map((employee) =>
            employee._id === id ? response.data : employee
          )
        );
        setEditingEmployeeId(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${config.apiURL}/delete/${id}`)
      .then(() => {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee._id !== id)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="home-page">
      <h1>Employee Data</h1>
      <button onClick={handleCreate}>Create New</button>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Hire Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              {editingEmployeeId === employee._id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="firstName"
                      value={editingData.firstName}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="lastName"
                      value={editingData.lastName}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      value={editingData.email}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="position"
                      value={editingData.position}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="department"
                      value={editingData.department}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      name="hireDate"
                      value={editingData.hireDate}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleSave(employee._id)}>
                      Save
                    </button>
                    <button onClick={() => setEditingEmployeeId(null)}>
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                  <td>{employee.hireDate}</td>
                  <td>
                    <button onClick={() => handleEdit(employee)}>Edit</button>
                    <button onClick={() => handleDelete(employee._id)}>
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
