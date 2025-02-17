


import React, { useState,useEffect } from 'react';
import {
  Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, TextField
} from '@mui/material';
import { Download } from '@mui/icons-material';
import api from "../../api";

export default function BillEntry() {
  const [billDetails, setBillDetails] = useState({
    bill_number: '',
    fullname: '',
    phone_number: '',
    address: '',
  });

  const [itemList, setItemList] = useState([
    { barcode: '', category: '', sub_category: '', size: '', item_name: '' }
  ]);
  const [loading, setLoading] = useState({ add: false, fetch: false });
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [salesReturnList, setSalesReturnList] = useState([]);

  useEffect(() => {
    fetchSalesReturns(); // Fetch data when the component loads
  }, []);

  const fetchSalesReturns = async () => {
    setLoading({ ...loading, tableFetch: true });
    try {
      const response = await api.get("api/salesreturn/returns/");
      if (response.data && response.data.data) {
        const transformedData = response.data.data.flatMap((returnItem) =>
          returnItem.items.map((item) => ({
            return_id: returnItem.return_id,
            item_name: item.item_name,
            barcode: item.barcode,
            category: item.category,
            sub_category: item.sub_category,
            size: item.size,
          }))
        );
        setSalesReturnList(transformedData);
      }
    } catch (error) {
      console.error("Error fetching sales return data", error);
    } finally {
      setLoading({ ...loading, tableFetch: false });
    }
  };

  const handleChange = (e) => {
    setBillDetails({
      ...billDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleItemChange = (e, index, field) => {
    const updatedItems = [...itemList];
    updatedItems[index][field] = e.target.value;
    setItemList(updatedItems);
  };

  const handleRemoveSalesReturn = () => {
    const updatedItems = itemList.filter((_, i) => i !== editIndex);
    setItemList(updatedItems);
    alert("Item removed from the sales return list.");
    setConfirmOpen(false);  // Close the confirmation dialog
  };
  

  const handleClickOpen = () => {
    setOpen(true);
    setEditIndex(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFetchData = async () => {
    const billNumber = billDetails.bill_number;
    if (billNumber.length > 0) {
      setLoading({ ...loading, fetch: true });
      try {
        const response = await api.get(`/api/retailsale/orders/${billNumber}/`);
        const data = response.data; // Assuming response contains the details for the bill
        setBillDetails({
          bill_number: data.bill_number,
          fullname: data.fullname,
          phone_number: data.phone_number,
          address: data.address,
        });
        if (data.items) {
          setItemList(data.items); // Populate items if available
        }
      } catch (error) {
        console.error("Error fetching bill details", error);
        alert("Failed to fetch bill details.");
      } finally {
        setLoading({ ...loading, fetch: false });
      }
    } else {
      alert("Please enter a valid Bill Number.");
    }
  };

  

  const handleAddSalesReturn = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, add: true });
  
    if (!billDetails.fullname || !billDetails.phone_number || !billDetails.address || !billDetails.bill_number) {
      alert("Please fill in all fields.");
      setLoading({ ...loading, add: false });
      return;
    }
  
    const salesReturnData = {
      bill_number: {
        full_name: billDetails.fullname,
        phone_number: billDetails.phone_number,
        address: billDetails.address
      },
      items: itemList.map(item => ({
        barcode: item.barcode,
        category: item.category,
        sub_category: item.sub_category,
        size: item.size,
        item_name: item.item_name
      }))
    };
  
    try {
      const response = await api.post('api/salesreturn/salesreturn/', salesReturnData);
      console.log('Sales return data sent successfully:', response.data);
  
      // Update state with return_id from response
      const returnId = response.data.data.return_id;
      setItemList(prevItems => [
        ...prevItems,
        {
          ...salesReturnData, 
          return_id: returnId,
          items: itemList
        }
      ]);
  
      alert("Sales return processed successfully.");
    } catch (error) {
      console.error("Error processing sales return", error);
      alert("Failed to process sales return.");
    } finally {
      setLoading({ ...loading, add: false });
      setOpen(false);  // Close the dialog after submission
    }
  };
  

  const generatePDF = () => {
    alert("PDF generation is not implemented yet.");
  };

  return (
    <Box sx={{ maxWidth: '100%', padding: 2, overflow: 'hidden' }}>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        {editIndex !== null ? 'Edit Item' : 'SALE RETURN'}
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ backgroundColor: '#f9dff5' }}>
          {editIndex !== null ? 'Edit Bill Details' : 'Add Bill Details'}
        </DialogTitle>
        <DialogContent style={{ backgroundColor: '#f9dff5' }}>
          <Paper sx={{ padding: '20px', backgroundColor: '#f9dff5' }} elevation={0}>
            <form>
              <Box sx={{ marginBottom: 3 }}>
                <h3>Customer Information</h3>
                <TextField
                  fullWidth
                  label="Bill Number"
                  name="bill_number"
                  value={billDetails.bill_number}
                  onChange={handleChange}
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleFetchData}
                  disabled={loading.fetch}
                >
                  {loading.fetch ? <CircularProgress size={24} /> : 'CHECK HERE'}
                </Button>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <TextField
                    label="Full Name"
                    name="fullname"
                    value={billDetails.fullname}
                    onChange={handleChange}
                    margin="normal"
                  />
                  <TextField
                    label="Phone Number"
                    name="phone_number"
                    value={billDetails.phone_number}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Box>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={billDetails.address}
                  onChange={handleChange}
                  margin="normal"
                />
              </Box>

              <Box sx={{ marginBottom: 3 }}>
                <h3>Item Information</h3>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 2 }}>
                  <TextField
                    label="Barcode"
                    value={itemList[0].barcode}
                    onChange={(e) => handleItemChange(e, 0, 'barcode')}
                    margin="normal"
                  />
                  <TextField
                    label="Category"
                    value={itemList[0].category}
                    onChange={(e) => handleItemChange(e, 0, 'category')}
                    margin="normal"
                  />
                  <TextField
                    label="Sub Category"
                    value={itemList[0].sub_category}
                    onChange={(e) => handleItemChange(e, 0, 'sub_category')}
                    margin="normal"
                  />
                  <TextField
                    label="Size"
                    value={itemList[0].size}
                    onChange={(e) => handleItemChange(e, 0, 'size')}
                    margin="normal"
                  />
                </Box>
                <TextField
                  fullWidth
                  label="Item Name"
                  value={itemList[0].item_name}
                  onChange={(e) => handleItemChange(e, 0, 'item_name')}
                  margin="normal"
                />
              </Box>
            </form>
          </Paper>
        </DialogContent>
        <DialogActions style={{ backgroundColor: '#f9dff5' }}>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleAddSalesReturn} color="secondary" disabled={loading.add}>
            {loading.add ? <CircularProgress size={24} /> : editIndex !== null ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      
      <TableContainer component={Paper} sx={{ marginTop: 3, overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Barcode</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Sub Category</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Return Id</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={generatePDF}>
                  <Download />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading.tableFetch ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              salesReturnList.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.item_name}</TableCell>
                  <TableCell>{item.barcode}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.sub_category}</TableCell>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.return_id || 'N/A'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleRemoveSalesReturn} color="error">Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
