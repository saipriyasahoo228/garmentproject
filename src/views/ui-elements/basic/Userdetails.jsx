import React, { useState, useRef ,useEffect} from 'react';
import {
  TextField, Button, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, MenuItem, Select, InputLabel, FormControl,
  Grid
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import api from "../../../api";

export default function Userdetails() {
  const [userDetails, setUserDetails] = useState({
    user_name: '',
    fullname: '',
    email: '',
    contact_number: '',
    role: '',
    password: '',
    password2: '',
    description: ''
  });

  const [userList, setUserList] = useState([]); // List to hold all user entries
  const [loading, setLoading] = useState({ add: false });
  const [open, setOpen] = useState(false); // State to control dialog visibility
  const [editIndex, setEditIndex] = useState(null); // Track index of the user being edited

  const [confirmOpen, setConfirmOpen] = useState(false); // State to control confirmation dialog visibility
  const [deleteIndex, setDeleteIndex] = useState(null); // Track index of the user to be deleted


  // Refs for form fields
  const usernameRef = useRef(null);
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const contactNumberRef = useRef(null);
  const roleRef = useRef(null);
  const passwordRef = useRef(null);
  const password2Ref = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading((prev) => ({ ...prev, fetch: true }));
      try {
        const response = await api.get('api/user/userdetails/'); // Replace with your actual API endpoint
        setUserList(response.data); // Update the user list state
        // alert(response.data.message);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading((prev) => ({ ...prev, fetch: false }));
      }
    };

    fetchUserData();
  }, []); // This effect runs only once when the component mounts

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleClickOpen = () => {
    setOpen(true); // Open the dialog when "Add User" button is clicked
    setEditIndex(null); // Reset the edit index
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog when "Cancel" button is clicked
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, add: true });
  
    try {
      if (editIndex !== null) {
        // Update existing user
        const response = await api.put(`api/user/userdetails/${userDetails.user_name}/`, userDetails);
        const updatedList = [...userList];
        updatedList[editIndex] = response.data; // Update with response data
        setUserList(updatedList);
        console.log("User updated successfully:", response.data);
        alert("User updated successfully:");
      } else {
        // Add new user
        const response = await api.post('api/user/userdetails/', userDetails);
        setUserList([...userList, response.data]); // Add new user to the list
        console.log("User added successfully:", response.data);
        alert("User added successfully:");
      }

    } catch (error) {
      console.error("Error adding/updating user:", error);
    } finally {
      setLoading({ ...loading, add: false });
      // Reset form and close dialog
      setUserDetails({
        user_name: '',
        fullname: '',
        email: '',
        contact_number: '',
        role: '',
        password: '',
        password2: '',
        description: ''
      });
      setOpen(false);
    }
  };
  

  const handleEdit = (index) => {
    setUserDetails(userList[index]); // Populate form with the selected user's details
    setEditIndex(index); // Set the index of the user being edited
    setOpen(true); // Open the dialog to edit
  };

  const handleDeleteConfirmation = (index) => {
    setDeleteIndex(index); // Store the index of the item to be deleted
    setConfirmOpen(true); // Open the confirmation dialog
  };
  
  const handleDelete = async (index) => {
    setUserDetails(userList[index]);
    // if (deleteIndex === null || deleteIndex === undefined) return;
  
    try {
      // const userId = userList[deleteIndex].id;
      // Assuming each user has an 'id' field
      const responce =await api.delete(`api/user/userdetails/${userDetails.user_name}/`, userDetails);// Perform the delete request
  
      // Filter out the deleted user from the listggg
      const updatedList = userList.filter((_, i) => i !== deleteIndex);
      setUserList(updatedList);
  
      console.log("User deleted successfully:", updatedList);
      alert(`User deleted successfully: ${updatedList}`);
    } catch (error) {
      console.error("Error adding/updating company:", error);

      if (error.response && error.response.data && error.response.data.error) {
          const errorDetails = error.response.data.error;
          let errorMessages = '';

          // Loop through the error details to construct a readable message
          for (const [field, messages] of Object.entries(errorDetails)) {
              errorMessages += `${field.toUpperCase()}: ${messages.join(", ")}\n`;
          }

          alert(`Validation Errors:\n${errorMessages}`);
      } else if (error.message) {
          alert(`Error: ${error.message}`); // General error
      } else {
          alert("An unknown error occurred."); // Fallback error message
      }
  } finally {
      setConfirmOpen(false); // Close the confirmation dialog
    }
  };
  
  const handleConfirmClose = () => {
    setConfirmOpen(false); // Close the confirmation dialog without deleting
  };
  

  // Function to handle Enter key press
  const handleKeyPress = (e, nextRef) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      if (nextRef.current) {
        nextRef.current.focus(); // Focus on the next field
      }
    }
  };

  return (
    <Box sx={{ maxWidth: '100%', padding: 2 }}>
      {/* Add User Button */}
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        {editIndex !== null ? 'Edit User' : 'Add User'}
      </Button>

      {/* Dialog (Popup) Form */}
      <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { width: '800px', maxWidth: 'none' } }}>
        <DialogTitle style={{backgroundColor:'#f9dff5'}}>{editIndex !== null ? 'Edit User Details' : 'Add User Details'}</DialogTitle>
        <DialogContent style={{backgroundColor:'#f9dff5'}}>
          <Paper sx={{ padding: "10px" , backgroundColor: "#f9dff5"}} elevation={0}>
          <form>
              <Grid container spacing={1}>
                {/* First row with two fields */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="User Name"
                    name="user_name"
                    value={userDetails.user_name}
                    onChange={handleChange}
                    margin="normal"
                    required
                    inputRef={usernameRef}
                    onKeyDown={(e) => handleKeyPress(e, fullNameRef)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullname"
                    value={userDetails.fullname}
                    onChange={handleChange}
                    margin="normal"
                    required
                    inputRef={fullNameRef}
                    onKeyDown={(e) => handleKeyPress(e, emailRef)}
                  />
                </Grid>
                
                {/* Second row with two fields */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={userDetails.email}
                    onChange={handleChange}
                    margin="normal"
                    required
                    inputRef={emailRef}
                    onKeyDown={(e) => handleKeyPress(e, contactNumberRef)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Contact Number"
                    name="contact_number"
                    value={userDetails.contact_number}
                    onChange={handleChange}
                    margin="normal"
                    required
                    inputRef={contactNumberRef}
                    onKeyDown={(e) => handleKeyPress(e, roleRef)}
                  />
                </Grid>

                {/* Third row with one field (Role dropdown) */}
                <Grid item xs={6}>
                  <FormControl fullWidth margin="normal" required>
                    <InputLabel>Role</InputLabel>
                    <Select
                      value={userDetails.role}
                      name="role"
                      onChange={handleChange}
                      label="Role"
                      inputRef={roleRef}
                      onKeyDown={(e) => handleKeyPress(e, passwordRef)}
                    >
                      <MenuItem value="Admin"  onKeyDown={(e) => handleKeyPress(e, passwordRef)}> Admin</MenuItem>
                      <MenuItem value="Employee"  onKeyDown={(e) => handleKeyPress(e, passwordRef)}>Employee</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Fourth row with two password fields */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={userDetails.password}
                    onChange={handleChange}
                    margin="normal"
                    required
                    inputRef={passwordRef}
                    onKeyDown={(e) => handleKeyPress(e, password2Ref)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Password2"
                    name="password2"
                    type="password"
                    value={userDetails.password2}
                    onChange={handleChange}
                    margin="normal"
                    required
                    inputRef={password2Ref}
                    onKeyDown={(e) => handleKeyPress(e, descriptionRef)}
                  />
                </Grid>

                {/* Last row with a description field */}
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Description"
                    name="description"
                    value={userDetails.description}
                    onChange={handleChange}
                    margin="normal"
                    inputRef={descriptionRef}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </DialogContent>
        <DialogActions style={{backgroundColor:'#f9dff5'}}>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleAddOrUpdate} color="secondary" disabled={loading.add}>
            {loading.add ? <CircularProgress size={24} /> : editIndex !== null ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Table to Display User Details */}
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email Address</TableCell>
              <TableCell>Contact Number</TableCell>
              <TableCell>Role</TableCell>
              {/* <TableCell>Password</TableCell>
              <TableCell>Description</TableCell> */}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {(Array.isArray(userList) ? userList : []).map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.user_name}</TableCell>
                <TableCell>{user.fullname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.contact_number}</TableCell>
                <TableCell>{user.role}</TableCell>
                {/* <TableCell>{user.password}</TableCell>
                <TableCell>{user.description}</TableCell> */}
                <TableCell>
                  <IconButton color="secondary" onClick={() => handleEdit(index)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteConfirmation(index)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog for Delete */}
      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="secondary">Cancel</Button>
          <Button onClick={handleDelete} color="error">Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
