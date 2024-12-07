// import React, { useState, useRef,useEffect } from 'react';
// import { TextField, Button,MenuItem, Box, Dialog, DialogActions,InputLabel,Select, FormControl,DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Alert } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import CircularProgress from '@mui/material/CircularProgress';

// import EditIcon from '@mui/icons-material/Edit';
// import api from "../../api";

// export default function PurchaseVoucher() {
//   const [partyInfo, setPartyInfo] = useState({ party_name: '', address: '' ,item: ''});
//   const [partyList, setPartyList] = useState([]); // Stores list of partiesu
//   const [loading, setLoading] = useState(false); // For loading state
//   const [voucherInfo, setVoucherInfo] = useState({ voucher_number: '', voucher_date: '' });
//   const [itemList, setItemList] = useState([]);
//   const [itemDetails, setItemDetails] = useState({
//     quantity: '',
//     rate: '',
//     discount_percentage: '', 
//     gst_percentage: '',
//     discount_amount: 0,
//     taxable_amount: 0,
//     gst_amount: 0,
//     purchase_amount: 0
//   });
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
//   const [error, setError] = useState('');
//   const [editIndex, setEditIndex] = useState(null);
//   const [itemToDelete, setItemToDelete] = useState(null);

//   // Create refs for each input field
//   const partyNameRef = useRef(null);
//   const addressRef = useRef(null);
//   const voucherNumberRef = useRef(null);
//   const voucherDateRef = useRef(null);
//   const quantityRef = useRef(null);
//   const rateRef = useRef(null);
//   const discountPercentageRef = useRef(null);
//   const gstPercentageRef = useRef(null);
//   const itemRef = useRef(null);


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get('api/user/purchase-entries/');
//         const fetchedData = response.data.data;
//         // Example: Set fetched voucher data
//         // if (fetchedData) {
//         //   setVoucherInfo({
//         //     voucher_number: fetchedData.voucher_number || '',
//         //     voucher_date: fetchedData.voucher_date || ''
//         //   });
//         //   setPartyInfo(fetchData.);
//         // }
//         setItemList(response.data.data);
//         // setVoucherInfo(fetchedData);
//         // setItemDetails(fetchedData);

//         // Optionally fetch other data if needed
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     const fetchParties = async () => {
//       setLoading(true);
//       try {
//         const response = await api.get('/api/user/party/'); // Replace with your API endpoint
//         const data = response.data.data;
//         setPartyList(data); // Assuming data is an array of parties
//       } catch (err) {
//         setError('Failed to load parties');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchParties();
//     fetchData();
//   }, []);

//   // Update Party Information
//   const handlePartyChange = (event) => {
//     const { name, value } = event.target;
//     if (name === 'party_name') {
//       const selectedParty = partyList.find(party => party.party_name === value);
//       if (selectedParty) {
//         setPartyInfo({
//           ...partyInfo,
//           party_name: selectedParty.party_name,
//           address: selectedParty.address,
//           item: selectedParty.item || ''
//         });
//       }
//     } else {
//       setPartyInfo({ ...partyInfo, [name]: value });
//     }
//   };

//   // Update Voucher Information
//   const handleVoucherChange = (e) => {
//     const { name, value } = e.target;
//     setVoucherInfo({ ...voucherInfo, [name]: value });
//   };

//   // Update Item Details
//   const handleItemChange = (e) => {
//     const { name, value } = e.target;
//     const updatedItem = { ...itemDetails, [name]: value };

//     // Calculate amounts
//     const quantity = parseFloat(updatedItem.quantity) || 0;
//     const rate = parseFloat(updatedItem.rate) || 0;
//     const amount = quantity * rate;
//     const discountAmount = (parseFloat(updatedItem.discount_percentage) / 100) * amount;
//     const taxableAmount = amount - discountAmount;
//     const gstAmount = (parseFloat(updatedItem.gst_percentage) / 100) * taxableAmount;
//     const purchaseAmount = taxableAmount + gstAmount;

//     setItemDetails({
//       ...updatedItem,
//       discount_amount: discountAmount || 0,
//       taxable_amount: taxableAmount || 0,
//       gst_amount: gstAmount || 0,
//       purchase_amount: purchaseAmount || 0
//     });
//   };

//   // Handle Enter Key Down Event
//   const handleKeyDown = (e, nextRef) => {
//     if (e.key === 'Enter' && nextRef && nextRef.current) {
//       e.preventDefault(); // Prevent default form submission
//       nextRef.current.focus(); // Move focus to the next field
//     }
//   };
//   const resetFormFields = () => {
//     setPartyInfo({
//       party_name: '',
//       address: '',
//       item:''
//     });
//     setVoucherInfo({
//       voucher_number: '',
//       voucher_date: ''
//     });
//     setItemDetails({
//       quantity: '',
//       rate: '',
//       discount_percentage: '',
//       gst_percentage: '',
//       discount_amount: 0,
//       taxable_amount: 0,
//       gst_amount: 0,
//       purchase_amount: 0
//     });
//     setOpenDialog(false);
//     setError('');
//   };
  

//   // Add or Update Item in List
//   const handleSaveItem = async () => {
//     const { party_name, address,item } = partyInfo;
//     const { voucher_number, voucher_date } = voucherInfo;
//     const { quantity, rate, discount_percentage, gst_percentage } = itemDetails;
  
//     // Validation (you already have this in place)
//     if (!party_name || !address || !voucher_number || !voucher_date || !quantity || !rate || !discount_percentage || !gst_percentage||!item) {
//       setError('Please fill in all fields.');
//       return;
//     }
    
  
//     const newItem = {
//       ...itemDetails,
//       party_name,
//       address,
//       item,
//       voucher_number,
//       voucher_date,
//     };
//     console.log(JSON.stringify(newItem, null, 2));
  
//     try {
//       let response;
//       if (editIndex !== null) {
//         // Update existing item via API
//         response = await api.put(`api/user/purchase-entries/${editIndex}`, newItem);
//       } else {
//         // Add new item via API
//         response = await api.post('api/user/purchase-entries/', newItem);
//       }
//       const savedItem = response.data;
  
//       // Update item list with response data (if needed)
//       if (editIndex !== null) {
//         // Update existing item
//         const updatedItemList = itemList.map((item, index) => index === editIndex ? savedItem : item);
//         setItemList(updatedItemList);
//         setEditIndex(null);
//       } else {
//         // Add new item to list
//         setItemList([...itemList, savedItem]);
//       }
  
//       // Reset fields after saving
//       resetFormFields();
  
//     } catch (error) {
//       console.error('Error saving data:', error);
//       setError('Error saving data. Please try again.');
//     }
//   };
  
//   // Open Dialog for Adding or Editing Items
//   const handleOpenDialog = (index = null) => {
//     if (index !== null) {
//       // Set item details for editing from itemList
//       const itemToEdit = itemList[index];
  
//       setItemDetails({
//         quantity: itemToEdit.quantity,
//         rate: itemToEdit.rate,
//         discount_percentage: itemToEdit.discount_percentage,
//         gst_percentage: itemToEdit.gst_percentage,
//         discount_amount: itemToEdit.discount_amount,
//         taxable_amount: itemToEdit.taxable_amount,
//         gst_amount: itemToEdit.gst_amount,
//         purchase_amount: itemToEdit.purchase_amount,
//       });
  
//       setPartyInfo({
//         party_name: itemToEdit.party_name,
//         address: itemToEdit.address,
//         item:itemToEdit.item
//       });
  
//       setVoucherInfo({
//         voucher_number: itemToEdit.voucher_number,
//         voucher_date: itemToEdit.voucher_date,
//       });
  
//       setEditIndex(index); // Set the index for editing
//     } else {
//       setEditIndex(null); // Clear the edit index for adding a new item
//     }
//     setOpenDialog(true); // Open the dialog
//   };
  

//   // Close Dialog
//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setError(''); // Clear any previous errors
//   };

//   // Open Confirmation Dialog
//   const handleOpenConfirmDialog = (index) => {
//     setItemToDelete(index);
//     setOpenConfirmDialog(true);
//   };

//   // Close Confirmation Dialog
//   const handleCloseConfirmDialog = () => {
//     setOpenConfirmDialog(false);
//     setItemToDelete(null);
//   };

//   // Confirm and Delete Item from List
//   const handleConfirmDelete = () => {
//     if (itemToDelete !== null) {
//       setItemList(itemList.filter((_, itemIndex) => itemIndex !== itemToDelete));
//       setItemToDelete(null);
//     }
//     setOpenConfirmDialog(false);
//   };

//   return (
//     <Box sx={{ maxWidth: '100%', padding: 2 }}>
//       {/* Button to Open Dialog for Adding or Editing Items */}
//       <Button variant="contained" color="secondary" onClick={() => handleOpenDialog()}>
//         {editIndex !== null ? 'Edit Item' : 'Add Item'}
//       </Button>

//       {/* Dialog (Popup) Form for Adding or Editing Item Details */}
//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle style={{backgroundColor:'#f9dff5'}}>{editIndex !== null ? 'Edit Item' : 'Add Item'}</DialogTitle>
//         <DialogContent style={{backgroundColor:'#f9dff5'}}>
//           {error && <Alert severity="error">{error}</Alert>}
//           {editIndex === null && (
//             <>
//           <FormControl fullWidth margin="normal">
//               <InputLabel>Party Name</InputLabel>
//               <Select
//                 value={partyInfo.party_name}
//                 onChange={handlePartyChange}
//                 label="Party Name"
//                 disabled={loading} // Disable the dropdown while loading
//                 inputRef={partyNameRef}
//             onKeyDown={(e) => handleKeyDown(e, addressRef)}
//               >
//                 {loading ? (
//                   <MenuItem disabled>
//                     <CircularProgress size={24} />
//                   </MenuItem>
//                 ) : (
//                   partyList.map((party) => (
//                     <MenuItem key={party.id} value={party.party_name}>
//                       {party.party_name}
//                     </MenuItem>
//                   ))
//                 )}
//               </Select>
//             </FormControl>
//           </>
//         )}

          
//           <TextField
//             fullWidth
//             label="Address"
//             name="address"
//             value={partyInfo.address}
//             onChange={handlePartyChange}
//             margin="normal"
//             inputRef={addressRef}
//             onKeyDown={(e) => handleKeyDown(e, itemRef)}
//           />
//           <TextField
//             fullWidth
//             label="Item"
//             name="item"
//             value={partyInfo.item}
//             onChange={handlePartyChange}
//             margin="normal"
//             inputRef={itemRef}
//             onKeyDown={(e) => handleKeyDown(e, voucherNumberRef)}
//           />
//           <TextField
//             fullWidth
//             label="Voucher Number"
//             name="voucher_number"
//             value={voucherInfo.voucher_number}
//             onChange={handleVoucherChange}
//             margin="normal"
//             inputRef={voucherNumberRef}
//             onKeyDown={(e) => handleKeyDown(e, voucherDateRef)}
//           />
//           <TextField
//             fullWidth
//             label="Voucher Date"
//             name="voucher_date"
//             type="date"
//             InputLabelProps={{ shrink: true }}
//             value={voucherInfo.voucher_date}
//             onChange={handleVoucherChange}
//             margin="normal"
//             inputRef={voucherDateRef}
//             onKeyDown={(e) => handleKeyDown(e, quantityRef)}
//           />
//           <TextField
//             fullWidth
//             label="Quantity"
//             name="quantity"
//             type="number"
//             value={itemDetails.quantity}
//             onChange={handleItemChange}
//             margin="normal"
//             inputRef={quantityRef}
//             onKeyDown={(e) => handleKeyDown(e, rateRef)}
//           />
//           <TextField
//             fullWidth
//             label="Rate"
//             name="rate"
//             type="number"
//             value={itemDetails.rate}
//             onChange={handleItemChange}
//             margin="normal"
//             inputRef={rateRef}
//             onKeyDown={(e) => handleKeyDown(e, discountPercentageRef)}
//           />
//           <TextField
//             fullWidth
//             label="Discount (%)"
//             name="discount_percentage"
//             type="number"
//             value={itemDetails.discount_percentage}
//             onChange={handleItemChange}
//             margin="normal"
//             inputRef={discountPercentageRef}
//             onKeyDown={(e) => handleKeyDown(e, gstPercentageRef)}
//           />
//           <TextField
//             fullWidth
//             label="GST (%)"
//             name="gst_percentage"
//             type="number"
//             value={itemDetails.gst_percentage}
//             onChange={handleItemChange}
//             margin="normal"
//             inputRef={gstPercentageRef}
//           />
//           <TextField
//             fullWidth
//             label="Discount Amount"
//             value={itemDetails.discount_amount}
//             InputProps={{ readOnly: true }}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Taxable Amount"
//             value={itemDetails.taxable_amount}
//             InputProps={{ readOnly: true }}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="GST Amount"
//             value={itemDetails.gst_amount}
//             InputProps={{ readOnly: true }}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Purchase Amount"
//             value={itemDetails.purchase_amount}
//             InputProps={{ readOnly: true }}
//             margin="normal"
//           />
//         </DialogContent>
//         <DialogActions style={{backgroundColor:'#f9dff5'}}>
//           <Button onClick={handleCloseDialog} color='error'>Cancel</Button>
//           <Button onClick={handleSaveItem} color='secondary'>{editIndex !== null ? 'Update Item' : 'Add'}</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Confirmation Dialog for Deleting an Item */}
//       <Dialog
//         open={openConfirmDialog}
//         onClose={handleCloseConfirmDialog}
//       >
//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent>
//           Are you sure you want to delete this item?
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseConfirmDialog}color='secondary'>Cancel</Button>
//           <Button onClick={handleConfirmDelete} color="error">
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Table to Display Items */}
//       <TableContainer component={Paper} sx={{ overflowX: 'auto', marginTop: 3 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Party Name</TableCell>
//               <TableCell>Item</TableCell>
//               <TableCell>Voucher Number</TableCell>
              
//               <TableCell>Voucher Date</TableCell>
//               <TableCell>Quantity</TableCell>
//               <TableCell>Rate</TableCell>
//               <TableCell>Discount (%)</TableCell>
//               <TableCell>GST (%)</TableCell>
//               <TableCell>Discount Amount</TableCell>
//               <TableCell>Taxable Amount</TableCell>
//               <TableCell>GST Amount</TableCell>
//               <TableCell>Purchase Amount</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {itemList.map((item, index) => (
//               <TableRow key={index}>
//                 <TableCell>{item.party_name}</TableCell>
//                 <TableCell>{item.item}</TableCell>
//                 <TableCell>{item.voucher_number}</TableCell>
//                 <TableCell>{item.voucher_date}</TableCell>
//                 <TableCell>{item.quantity}</TableCell>
//                 <TableCell>{item.rate}</TableCell>
//                 <TableCell>{item.discount_percentage}</TableCell>
//                 <TableCell>{item.gst_percentage}</TableCell>
//                 <TableCell>{item.discount_amount}</TableCell>
//                 <TableCell>{item.taxable_amount}</TableCell>
//                 <TableCell>{item.gst_amount}</TableCell>
//                 <TableCell>{item.purchase_amount}</TableCell>
//                 <TableCell>
//                   <IconButton color="secondary" onClick={() => handleOpenDialog(index)}>
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton color="error" onClick={() => handleOpenConfirmDialog(index)}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }

import React, { useState, useRef, useEffect } from 'react';
import { TextField, Button,Grid, MenuItem, Box, Dialog, DialogActions, InputLabel, Select, FormControl, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import api from '../../api';

export default function PurchaseVoucher() {
  const [partyInfo, setPartyInfo] = useState({ party_name: '', address: '', item: '' });
  const [partyList, setPartyList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [voucherInfo, setVoucherInfo] = useState({ voucher_number: '', voucher_date: '' });
  const [itemList, setItemList] = useState([]);
  const [itemDetails, setItemDetails] = useState({
    quantity: '',
    rate: '',
    discount_percentage: '',
    gst_percentage: '',
    discount_amount: 0,
    taxable_amount: 0,
    gst_amount: 0,
    purchase_amount: 0
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  // const [openDialog, setOpenDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
//   const [error, setError] = useState('');
//   const [editIndex, setEditIndex] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const partyNameRef = useRef(null);
  const addressRef = useRef(null);
  const itemRef = useRef(null);
  const voucherNumberRef = useRef(null);
  const voucherDateRef = useRef(null);
  const quantityRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('api/purchase/purchase-entries/');
        setItemList(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchParties = async () => {
      setLoading(true);
      try {
        const response = await api.get('/api/user/party/');
        setPartyList(response.data.data);
      } catch (err) {
        setError('Failed to load parties');
      } finally {
        setLoading(false);
      }
    };

    fetchParties();
    fetchData();
  }, []);

  const handlePartyChange = (event) => {
    const { name, value } = event.target;
    if (name === 'party_name') {
      const selectedParty = partyList.find(party => party.party_name === value);
      if (selectedParty) {
        setPartyInfo({
          ...partyInfo,
          party_name: selectedParty.party_name,
          address: selectedParty.address,
          item: selectedParty.item || ''
        });
      }
    } else {
      setPartyInfo({ ...partyInfo, [name]: value });
    }
  };

  const handleVoucherChange = (e) => {
    const { name, value } = e.target;
    setVoucherInfo({ ...voucherInfo, [name]: value });
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    const updatedItem = { ...itemDetails, [name]: value };
    const quantity = parseFloat(updatedItem.quantity) || 0;
    const rate = parseFloat(updatedItem.rate) || 0;
    const amount = quantity * rate;
    const discountAmount = (parseFloat(updatedItem.discount_percentage) / 100) * amount;
    const taxableAmount = amount - discountAmount;
    const gstAmount = (parseFloat(updatedItem.gst_percentage) / 100) * taxableAmount;
    const purchaseAmount = taxableAmount + gstAmount;

    setItemDetails({
      ...updatedItem,
      discount_amount: discountAmount || 0,
      taxable_amount: taxableAmount || 0,
      gst_amount: gstAmount || 0,
      purchase_amount: purchaseAmount || 0
    });
  };

  const handleSaveItem = async () => {
    const { party_name, address, item } = partyInfo;
    const { voucher_number, voucher_date } = voucherInfo;
    const { quantity, rate, discount_percentage, gst_percentage } = itemDetails;

    if (!party_name || !address || !voucher_number || !voucher_date || !quantity || !rate || !discount_percentage || !gst_percentage || !item) {
      setError('Please fill in all fields.');
      return;
    }

    const newItem = {
      ...itemDetails,
      party_name,
      address,
      item,
      voucher_number,
      voucher_date,
    };
    console.log(JSON.stringify(newItem, null, 2));

    try {
      let response;
      if (editIndex !== null) {
        response = await api.put(`api/purchase/purchase-entries/${newItem.party_name}/`, newItem);
      } else {
        response = await api.post('api/purchase/purchase-entries/', newItem);
      }
      const savedItem = response.data;

      if (editIndex !== null) {
        const updatedItemList = itemList.map((item, index) => index === editIndex ? savedItem : item);
        setItemList(updatedItemList);
        setEditIndex(null);
      } else {
        setItemList([...itemList, savedItem]);
      }

      resetFormFields();
    } catch (error) {
      console.error('Error saving data:', error);
      setError('Error saving data. Please try again.');
    }
  };

  const resetFormFields = () => {
    setPartyInfo({ party_name: '', address: '', item: '' });
    setVoucherInfo({ voucher_number: '', voucher_date: '' });
    setItemDetails({
      quantity: '',
      rate: '',
      discount_percentage: '',
      gst_percentage: '',
      discount_amount: 0,
      taxable_amount: 0,
      gst_amount: 0,
      purchase_amount: 0
    });
    setOpenDialog(false);
    setError('');
  };

  const handleOpenDialog = (index = null) => {
    if (index !== null) {
      const itemToEdit = itemList[index];
      setItemDetails({
        quantity: itemToEdit.quantity,
        rate: itemToEdit.rate,
        discount_percentage: itemToEdit.discount_percentage,
        gst_percentage: itemToEdit.gst_percentage,
        discount_amount: itemToEdit.discount_amount,
        taxable_amount: itemToEdit.taxable_amount,
        gst_amount: itemToEdit.gst_amount,
        purchase_amount: itemToEdit.purchase_amount,
      });
      setPartyInfo({ party_name: itemToEdit.party_name, address: itemToEdit.address, item: itemToEdit.item });
      setVoucherInfo({ voucher_number: itemToEdit.voucher_number, voucher_date: itemToEdit.voucher_date });
      setEditIndex(index);
    } else {
      setEditIndex(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setError('');
  };
  //   // Close Dialog
//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setError(''); // Clear any previous errors
//   };

  // Open Confirmation Dialog
  const handleOpenConfirmDialog = (index) => {
    setItemToDelete(index);
    setOpenConfirmDialog(true);
  };

  // Close Confirmation Dialog
  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setItemToDelete(null);
  };

  // Confirm and Delete Item from List
  const handleConfirmDelete = async () => {
    if (itemToDelete !== null) {
      const itemToDeleteData = itemList[itemToDelete]; // Get the item to delete (optional for API)
      try {
        // Assuming you have an endpoint like 'api/user/purchase-entries/{id}/' for deleting
        // Modify the URL and ID/identifier as per your API
        await api.delete(`api/user/purchase-entries/${itemToDeleteData.party_name}/`);
  
        // Update the local state after successful deletion
        setItemList(itemList.filter((_, itemIndex) => itemIndex !== itemToDelete));
        setItemToDelete(null);
        setOpenConfirmDialog(false);
      } catch (error) {
        console.error('Error deleting item:', error);
        setError('Failed to delete the item. Please try again.');
        setOpenConfirmDialog(false); // Optionally keep dialog open for retry
      }
    }
  };
  


  return (
    <Box sx={{ maxWidth: '100%', padding: 2 }}>
      <Button variant="contained" color="secondary" onClick={() => handleOpenDialog()}>
        {editIndex !== null ? 'Edit Item' : 'Add Item'}
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle style={{ backgroundColor: '#f9dff5' }}>{editIndex !== null ? 'Edit Item' : 'Add Item'}</DialogTitle>
        <DialogContent style={{ backgroundColor: '#f9dff5' }}>
          {error && <Alert severity="error">{error}</Alert>}
          <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Party Name</InputLabel>
            <Select
              value={partyInfo.party_name}
              onChange={handlePartyChange}
              label="Party Name"
              name="party_name"
              disabled={loading}
              inputRef={partyNameRef}
            >
              {loading ? (
                <MenuItem disabled>
                  <CircularProgress size={24} />
                </MenuItem>
              ) : (
                partyList.map((party) => (
                  <MenuItem key={party.id} value={party.party_name}>
                    {party.party_name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
          </Grid>
          <Grid item xs={6}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={partyInfo.address}
            onChange={handlePartyChange}
            margin="normal"
            inputRef={addressRef}
          />
          </Grid>
          </Grid>
          <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={6}>
          <TextField
            fullWidth
            label="Item"
            name="item"
            value={partyInfo.item}
            onChange={handlePartyChange}
            margin="normal"
            inputRef={itemRef}
          />
          </Grid>
          <Grid item xs={6}>
          <TextField
            fullWidth
            label="Voucher Number"
            name="voucher_number"
            value={voucherInfo.voucher_number}
            onChange={handleVoucherChange}
            margin="normal"
            inputRef={voucherNumberRef}
          />
          </Grid>
          </Grid>
          <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={6}>
          <TextField
            fullWidth
            label="Voucher Date"
            type="date"
            name="voucher_date"
            value={voucherInfo.voucher_date}
            onChange={handleVoucherChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            inputRef={voucherDateRef}
          />
          </Grid>
          <Grid item xs={6}>
          <TextField
            fullWidth
            label="Quantity"
            name="quantity"
            value={itemDetails.quantity}
            onChange={handleItemChange}
            margin="normal"
            inputRef={quantityRef}
          />
          </Grid>
          </Grid>

          <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={6}>
          <TextField
            fullWidth
            label="Rate"
            name="rate"
            value={itemDetails.rate}
            onChange={handleItemChange}
            margin="normal"
          />
          </Grid>
          <Grid item xs={6}>
          <TextField
            fullWidth
            label="Discount (%)"
            name="discount_percentage"
            value={itemDetails.discount_percentage}
            onChange={handleItemChange}
            margin="normal"
          />
          </Grid>
          </Grid>
          <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={6}>
          <TextField
            fullWidth
            label="GST (%)"
            name="gst_percentage"
            value={itemDetails.gst_percentage}
            onChange={handleItemChange}
            margin="normal"
          />
          </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ backgroundColor: '#f9dff5' }}>
        <Button onClick={handleSaveItem} color="primary">
            Save
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
         
        </DialogActions>
      </Dialog>
       {/* Confirmation Dialog for Deleting an Item */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}color='secondary'>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

        {/* Table to Display Items */}
       <TableContainer component={Paper} sx={{ overflowX: 'auto', marginTop: 3 }}>
         <Table>
           <TableHead>
             <TableRow>
               <TableCell>Party Name</TableCell>
               <TableCell>Item</TableCell>
               <TableCell>Voucher Number</TableCell>
              
               <TableCell>Voucher Date</TableCell>
               <TableCell>Quantity</TableCell>
              <TableCell>Rate</TableCell>
               <TableCell>Discount (%)</TableCell>
               <TableCell>GST (%)</TableCell>
               <TableCell>Discount Amount</TableCell>
               <TableCell>Taxable Amount</TableCell>
               <TableCell>GST Amount</TableCell>
               <TableCell>Purchase Amount</TableCell>
               <TableCell>Actions</TableCell>
             </TableRow>
          </TableHead>
           <TableBody>
             {itemList.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.party_name}</TableCell>
                <TableCell>{item.item}</TableCell>
                <TableCell>{item.voucher_number}</TableCell>
                <TableCell>{item.voucher_date}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.rate}</TableCell>
                <TableCell>{item.discount_percentage}</TableCell>
                <TableCell>{item.gst_percentage}</TableCell>
                <TableCell>{item.discount_amount}</TableCell>
                <TableCell>{item.taxable_amount}</TableCell>
                <TableCell>{item.gst_amount}</TableCell>
                <TableCell>{item.purchase_amount}</TableCell>
                <TableCell>
                  <IconButton color="secondary" onClick={() => handleOpenDialog(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleOpenConfirmDialog(index)}>
                    <DeleteIcon />
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

