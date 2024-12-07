// import React, { useState, useRef ,useEffect} from 'react';
// import {
//   TextField, Button, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Paper,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, MenuItem, Select, InputLabel, FormControl
// } from '@mui/material';
// import { Edit, Delete } from '@mui/icons-material';
// import api from "../../../api";

// export default function PartyReport() {
//   const [partyDetails, setPartyDetails] = useState({
//     party_name: '',
//     gst_number: '',
//     party_type: '',
//     phone: '',
//     email: '',
//     address: '',
//     description: ''
//   });

//   const [partyList, setPartyList] = useState([]); // List to hold all party entries
//   const [loading, setLoading] = useState({ add: false });
//   const [open, setOpen] = useState(false); // State to control dialog visibility
//   const [editIndex, setEditIndex] = useState(null); // Track index of the party being edited
//   const [deleteIndex, setDeleteIndex] = useState(null); // Track index for deletion confirmation
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State to control delete confirmation dialog

//   // Refs for each field
//   const partyNameRef = useRef(null);
//   const partyRegNoRef = useRef(null);
//   const partyTypeRef = useRef(null);
//   const phoneRef = useRef(null);
//   const emailRef = useRef(null);
//   const addressRef = useRef(null);
//   const descriptionRef = useRef(null);

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await api.get('/api/user/party/'); // Replace with your actual endpoint
//         setPartyList(response.data.data);
//       } catch (error) {
//         console.error("Error fetching items:", error);
//       }
//     };

   
//     fetchItems(); // Fetch categories when component mounts
//   }, []);

//   const handleChange = (e) => {
//     setPartyDetails({
//       ...partyDetails,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleClickOpen = () => {
//     setOpen(true); // Open the dialog when "Add Party" button is clicked
//     setEditIndex(null); // Reset the edit index
//   };

//   const handleClose = () => {
//     setOpen(false); // Close the dialog when "Cancel" button is clicked
//   };

//   const handleAddOrUpdate = async (e) => {
//     e.preventDefault();
//     setLoading({ ...loading, add: true });

//     try {
//       if (editIndex !== null) {
//         // Update logic
//         const updatedParty = await api.put(`/api/user/party/${partyDetails.party_name}/`, partyDetails);
//         const updatedList = [...partyList];
//         updatedList[editIndex] = updatedParty.data;
//         setPartyList(updatedList);
//       } else {
//         // Add logic
//         const newParty = await api.post('/api/user/party/', partyDetails);
//         setPartyList([...partyList, newParty.data]);
//       }
//     } catch (error) {
//       console.error('Error adding/updating party:', error);
//     } finally {
//       setLoading({ ...loading, add: false });
//       setPartyDetails({
//         party_name: '',
//         gst_number: '',
//         party_type: '',
//         phone: '',
//         email: '',
//         address: '',
//         description: ''
//       });
//       setOpen(false);
//     }
//   };


//   const handleEdit = (index) => {
//     setPartyDetails(partyList[index]); // Populate form with the selected party's details
//     setEditIndex(index); // Set the index of the party being edited
//     setOpen(true); // Open the dialog to edit
//   };

//   const handleDelete = (index) => {
//     setDeleteIndex(index); // Set the index of the party to be deleted
//     setOpenDeleteDialog(true);
//     setPartyDetails(partyList[index]); // Open the delete confirmation dialog
//   };

//   const confirmDelete = async () => {
//     try {
//       await api.delete(`/api/user/party/${partyDetails.party_name}/`, partyDetails);
//       const updatedList = partyList.filter((_, i) => i !== deleteIndex);
//       setPartyList(updatedList);
//     } catch (error) {
//       console.error('Error deleting party:', error);
//     } finally {
//       setOpenDeleteDialog(false);
//     }
//   };


//   const cancelDelete = () => {
//     setOpenDeleteDialog(false); // Close the confirmation dialog without deleting
//   };

//   // Function to handle Enter key to move to the next field
//   const handleKeyDown = (e, nextRef) => {
//     if (e.key === 'Enter' && nextRef) {
//       e.preventDefault(); // Prevent form submission
//       nextRef.current.focus(); // Focus the next field
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: '100%', padding: 2 }}>
//       {/* Add Party Button */}
//       <Button variant="contained" color="secondary" onClick={handleClickOpen}>
//         {editIndex !== null ? 'Edit Party' : 'Add Party'}
//       </Button>

//       {/* Dialog (Popup) Form */}
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle style={{backgroundColor:'#f9dff5'}}>{editIndex !== null ? 'Edit Party Details' : 'Add Party Details'}</DialogTitle>
//         <DialogContent style={{backgroundColor:'#f9dff5'}}>
//           <Paper sx={{ padding: "10px" , backgroundColor: "#f9dff5"}} elevation={0}>
//             <form>
//               {/* Party Type */}
//               <FormControl fullWidth margin="normal" required>
//                 <InputLabel>Party Type</InputLabel>
//                 <Select
//                   value={partyDetails.party_type}
//                   name="party_type"
//                   onChange={handleChange}
//                   label="Party Type"
//                   inputRef={partyTypeRef}
//                   onKeyDown={(e) => handleKeyDown(e, partyNameRef)}
//                 >
//                   <MenuItem value="Vendor">Vendor</MenuItem>
//                   <MenuItem value="Supplier">Supplier</MenuItem>
//                   <MenuItem value="Customer">Customer</MenuItem>
//                 </Select>
//               </FormControl>

//               {/* Party Name */}
//               <TextField
//                 fullWidth
//                 label="Party Name"
//                 name="party_name"
//                 value={partyDetails.party_name}
//                 onChange={handleChange}
//                 margin="normal"
//                 required
//                 inputRef={partyNameRef}
//                 onKeyDown={(e) => handleKeyDown(e, partyRegNoRef)}
//               />

//               {/* Party Registration/GST Number */}
//               <TextField
//                 fullWidth
//                 label="Party Registration/GST Number"
//                 name="gst_number"
//                 value={partyDetails.gst_number}
//                 onChange={handleChange}
//                 margin="normal"
//                 required
//                 inputRef={partyRegNoRef}
//                 onKeyDown={(e) => handleKeyDown(e, phoneRef)}
//               />

//               {/* Phone Number */}
//               <TextField
//                 fullWidth
//                 label="Phone Number"
//                 name="phone"
//                 value={partyDetails.phone}
//                 onChange={handleChange}
//                 margin="normal"
//                 required
//                 inputRef={phoneRef}
//                 onKeyDown={(e) => handleKeyDown(e, emailRef)}
//               />

//               {/* Email */}
//               <TextField
//                 fullWidth
//                 label="Email"
//                 name="email"
//                 value={partyDetails.email}
//                 onChange={handleChange}
//                 margin="normal"
//                 required
//                 inputRef={emailRef}
//                 onKeyDown={(e) => handleKeyDown(e, addressRef)}
//               />

//               {/* Address */}
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={3}
//                 label="Address"
//                 name="address"
//                 value={partyDetails.address}
//                 onChange={handleChange}
//                 margin="normal"
//                 required
//                 inputRef={addressRef}
//                 onKeyDown={(e) => handleKeyDown(e, descriptionRef)}
//               />

//               {/* Description */}
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={4}
//                 label="Description"
//                 name="description"
//                 value={partyDetails.description}
//                 onChange={handleChange}
//                 margin="normal"
//                 inputRef={descriptionRef}
//               />
//             </form>
//           </Paper>
//         </DialogContent>
//         <DialogActions style={{backgroundColor:'#f9dff5'}}>
//           <Button onClick={handleClose} color="error">
//             Cancel
//           </Button>
//           <Button onClick={handleAddOrUpdate} color="secondary" disabled={loading.add}>
//             {loading.add ? <CircularProgress size={24} /> : editIndex !== null ? 'Update' : 'Add'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Table to Display Party Details */}
//       <TableContainer component={Paper} sx={{ marginTop: 3 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Party Name</TableCell>
//               <TableCell>Party Registration/GST No.</TableCell>
//               <TableCell>Party Type</TableCell>
//               <TableCell>Phone</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Address</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {partyList.map((party, index) => (
//               <TableRow key={index}>
//                 <TableCell>{party.party_name}</TableCell>
//                 <TableCell>{party.gst_number}</TableCell>
//                 <TableCell>{party.party_type}</TableCell>
//                 <TableCell>{party.phone}</TableCell>
//                 <TableCell>{party.email}</TableCell>
//                 <TableCell>{party.address}</TableCell>
//                 <TableCell>{party.description}</TableCell>
//                 <TableCell>
//                   <IconButton color="primary" onClick={() => handleEdit(index)}>
//                     <Edit />
//                   </IconButton>
//                   <IconButton color="secondary" onClick={() => handleDelete(index)}>
//                     <Delete />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={openDeleteDialog} onClose={cancelDelete}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>Are you sure you want to delete this party entry?</DialogContent>
//         <DialogActions>
//           <Button onClick={cancelDelete} color="secondary">Cancel</Button>
//           <Button onClick={confirmDelete} color="error">Confirm</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

import React, { useState, useRef, useEffect } from 'react';
import {
  TextField, Button, Grid, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Paper,Box,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import api from "../../../api";

export default function PartyReport() {
  const [partyDetails, setPartyDetails] = useState({
    party_name: '',
    gst_number: '',
    party_type: '',
    phone: '',
    email: '',
    address: '',
    description: ''
  });

  const [partyList, setPartyList] = useState([]); // List to hold all party entries
  const [loading, setLoading] = useState({ add: false });
  const [open, setOpen] = useState(false); // State to control dialog visibility
  const [editIndex, setEditIndex] = useState(null); // Track index of the party being edited
  const [deleteIndex, setDeleteIndex] = useState(null); // Track index for deletion confirmation
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State to control delete confirmation dialog

  // Refs for each field
  const partyNameRef = useRef(null);
  const partyRegNoRef = useRef(null);
  const partyTypeRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const addressRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get('/api/user/party/'); // Replace with your actual endpoint
        setPartyList(response.data.data);
        alert(response.data.message);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems(); // Fetch categories when component mounts
  }, []);

  const handleChange = (e) => {
    setPartyDetails({
      ...partyDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleClickOpen = () => {
    setOpen(true); // Open the dialog when "Add Party" button is clicked
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
        // Update logic
        const updatedParty = await api.put(`/api/user/party/${partyDetails.party_name}/`, partyDetails);
        const updatedList = [...partyList];
        updatedList[editIndex] = updatedParty.data;
        alert(updatedParty.data.message);
        setPartyList(updatedList);
      } else {
        // Add logic
        const newParty = await api.post('/api/user/party/', partyDetails);
        setPartyList([...partyList, newParty.data]);
        alert(newParty.data.message);
      }
    } catch (error) {
      console.error('Error adding/updating party:', error);
    } finally {
      setLoading({ ...loading, add: false });
      setPartyDetails({
        party_name: '',
        gst_number: '',
        party_type: '',
        phone: '',
        email: '',
        address: '',
        description: ''
      });
      setOpen(false);
    }
  };

  const handleEdit = (index) => {
    setPartyDetails(partyList[index]); // Populate form with the selected party's details
    setEditIndex(index); // Set the index of the party being edited
    setOpen(true); // Open the dialog to edit
  };

  const handleDelete = (index) => {
    setDeleteIndex(index); // Set the index of the party to be deleted
    setOpenDeleteDialog(true);
    setPartyDetails(partyList[index]); // Open the delete confirmation dialog
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/user/party/${partyDetails.party_name}/`, partyDetails);
      const updatedList = partyList.filter((_, i) => i !== deleteIndex);
      setPartyList(updatedList);
    } catch (error) {
      console.error('Error deleting party:', error);
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false); // Close the confirmation dialog without deleting
  };

  // Function to handle Enter key to move to the next field
  const handleKeyDown = (e, nextRef) => {
    if (e.key === 'Enter' && nextRef) {
      e.preventDefault(); // Prevent form submission
      nextRef.current.focus(); // Focus the next field
    }
  };

  return (
    <Box sx={{ maxWidth: '100%', padding: 2 }}>
      {/* Add Party Button */}
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        {editIndex !== null ? 'Edit Party' : 'Add Party'}
      </Button>

      {/* Dialog (Popup) Form */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle style={{ backgroundColor: '#f9dff5' }}>
          {editIndex !== null ? 'Edit Party Details' : 'Add Party Details'}
        </DialogTitle>
        <DialogContent style={{ backgroundColor: '#f9dff5' }}>
          <Paper sx={{ padding: "10px", backgroundColor: "#f9dff5" }} elevation={0}>
            <form>
              {/* Pair 1: Party Type & Party Name */}
              <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth margin="normal" required>
                    <InputLabel>Party Type</InputLabel>
                    <Select
                      value={partyDetails.party_type}
                      name="party_type"
                      onChange={handleChange}
                      label="Party Type"
                      inputRef={partyTypeRef}
                      onKeyDown={(e) => handleKeyDown(e, partyNameRef)}
                    >
                      <MenuItem value="Vendor">Vendor</MenuItem>
                      <MenuItem value="Supplier">Supplier</MenuItem>
                      <MenuItem value="Customer">Customer</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Party Name"
                    name="party_name"
                    value={partyDetails.party_name}
                    onChange={handleChange}
                    margin="normal"
                    required
                    inputRef={partyNameRef}
                    onKeyDown={(e) => handleKeyDown(e, partyRegNoRef)}
                  />
                </Grid>
              </Grid>

              {/* Pair 2: Party Registration/GST Number & Phone Number */}
              <Grid container spacing={2} marginBottom={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Party Registration/GST Number"
                    name="gst_number"
                    value={partyDetails.gst_number}
                    onChange={handleChange}
                    margin="normal"
                    required
                    inputRef={partyRegNoRef}
                    onKeyDown={(e) => handleKeyDown(e, phoneRef)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={partyDetails.phone}
                    onChange={handleChange}
                    margin="normal"
                    required
                    inputRef={phoneRef}
                    onKeyDown={(e) => handleKeyDown(e, emailRef)}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} marginBottom={2}>
              <Grid item xs={6}>
              {/* Email */}
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={partyDetails.email}
                onChange={handleChange}
                margin="normal"
                required
                inputRef={emailRef}
                onKeyDown={(e) => handleKeyDown(e, addressRef)}
              />
              </Grid>

              {/* Address */}
              <Grid item xs={6}>
              <TextField
                fullWidth
                multiline
                // rows={3}
                label="Address"
                name="address"
                value={partyDetails.address}
                onChange={handleChange}
                margin="normal"
                required
                inputRef={addressRef}
                onKeyDown={(e) => handleKeyDown(e, descriptionRef)}
              />
              </Grid>
              </Grid>

              {/* Description */}
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                name="description"
                value={partyDetails.description}
                onChange={handleChange}
                margin="normal"
                inputRef={descriptionRef}
              />
            </form>
          </Paper>
        </DialogContent>
        <DialogActions style={{ backgroundColor: '#f9dff5' }}>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleAddOrUpdate} color="secondary" disabled={loading.add}>
            {loading.add ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this party?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="error">
            No
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Party List */}
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Party Name</TableCell>
              <TableCell>Party Type</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {partyList.map((party, index) => (
              <TableRow key={party.party_name}>
                <TableCell>{party.party_name}</TableCell>
                <TableCell>{party.party_type}</TableCell>
                <TableCell>{party.phone}</TableCell>
                <TableCell>{party.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(index)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(index)} color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
