import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import "./Create.css";
import config from "../config";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackSeverity, setSnackSeverity] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const response = await axios.post(`${config.apiURL}/create`, {
          firstName,
          lastName,
          email,
          position,
          department,
          hireDate,
        });
        setSnackMessage(" Successful");
        setSnackSeverity("success");
        navigate("/");
      } catch (error) {
        setSnackMessage(
          error.response?.data?.message ||
            "Registration Failed, please try again."
        );
        setSnackSeverity("error");
      } finally {
        setLoading(false);
        setSnackOpen(true);
      }
    }
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!firstName) {
      tempErrors.firstName = "FirstName is required";
      isValid = false;
    }
    if (!lastName) {
      tempErrors.lastName = "LastName is required";
      isValid = false;
    }
    if (!email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
      tempErrors.email = "Invalid email address";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSnackClose = () => setSnackOpen(false);

  return (
    <div className="auth-container">
      <h2 className="auth-title">create</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <TextField
          label="firstName"
          variant="outlined"
          fullWidth
          margin="normal"
          value={firstName}
          onChange={(e) => setfirstName(e.target.value)}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <TextField
          label="LastName"
          variant="outlined"
          fullWidth
          margin="normal"
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          label="Position"
          variant="outlined"
          fullWidth
          margin="normal"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          error={!!errors.position}
          helperText={errors.position}
        />
        <TextField
          label="department"
          variant="outlined"
          fullWidth
          margin="normal"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          error={!!errors.department}
          helperText={errors.department}
        />
        <TextField
          label="HireDate"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          value={hireDate}
          onChange={(e) => setHireDate(e.target.value)}
          error={!!errors.hireDate}
          helperText={errors.hireDate}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Register"}
        </Button>
      </form>

      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleSnackClose}
      >
        <Alert onClose={handleSnackClose} severity={snackSeverity}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateEmployee;
