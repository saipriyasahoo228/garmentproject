

// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Container, Paper, Grid, IconButton, InputAdornment
// } from '@mui/material';
// import { Send as SendIcon, Print as PrintIcon } from '@mui/icons-material';
// import dayjs from 'dayjs';
// import api from "../../api";

// export default function RetailSale() {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     number: '',
//     address: '',
//     barcode: '',
//     itemName: '',
//     unit: '',
//     unitPrice: '',
//     tax: '',
//     discount: '',
//     totalPrice: '',
//     paymentMethod1: 'Cash',
//     paymentMethod2: 'UPI',
//     narration: ''
//   });

//   const [barcodeList, setBarcodeList] = useState([]);
//   const [isDiscountApplicable, setIsDiscountApplicable] = useState(false);
//   const salesDateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
//   const inputRefs = useRef([]);

//   // Effect to fetch data when barcode changes
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Assuming `api` is an axios instance or configured for making API calls
//         const response = await api.get(`api/barcode/get-barcode-details/${formData.barcode}/`);
        
//         // Access data directly from the response object
//         const data = response.data;
  
//         // Check if data and item_details exist before setting state
//         if (data && data.item_details) {
//           setBarcodeList(data.item_details);
//           console.log(data.item_details);  // Log the item details for debugging
  
//           setFormData({
//             ...formData,
//             itemName: data.item_details.item_name || '',  // Set itemName from response
//             unitPrice: data.item_details.item_price || ''  // Set unitPrice from response
//           });
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
  
//     fetchData();
//   }, [formData.barcode]); // Ensure useEffect re-runs when `formData.barcode` changes
  




// useEffect(() => {
//   const fetchTotalPrice = async () => {
//     try {
//       // Send the necessary data to the backend for the total price calculation
//       const response = await api.post('api/retailsale/calculate-total-price/', {
//         unitPrice: formData.unitPrice,
//         unit:formData.unit,
//         tax: formData.tax,
//         discount: formData.discount,
//         isDiscountApplicable: isDiscountApplicable
//       });

//       // Check if response has the expected data
//       if (response.data && response.data.totalPrice !== undefined) {
//         setFormData(prev => ({
//           ...prev,
//           totalPrice: response.data.totalPrice.toFixed(2)
//         }));
//       }
//     } catch (error) {
//       console.error('Error fetching total price:', error);
//     }
//   };

//   // Only call the API if the necessary data is available
//   if (formData.unitPrice !== undefined && formData.tax !== undefined && formData.discount !== undefined) {
//     fetchTotalPrice();
//   }
// }, [formData.unitPrice, formData.tax, formData.discount, isDiscountApplicable]);


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     submitFormData();
//   };

//   const submitFormData = async () => {
//     try {
//       const response = await api.post('/api/retailsale/create-order/', formData);
//       if (response.status === 200) {
//         console.log('Form data submitted successfully:', response.data);
//         alert('Sale recorded successfully!');
//       } else {
//         console.error('Failed to submit data:', response.data);
//         alert('There was an error recording the sale.');
//       }
//     } catch (error) {
//       console.error('Error submitting form data:', error);
//       alert('An unexpected error occurred. Please try again later.');
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       const nextIndex = index + 1;
//       if (nextIndex < inputRefs.current.length) {
//         inputRefs.current[nextIndex].focus();
//       }
//     }
//   };

//   const handleSendNotification = () => {
//     alert('Notification sent!');
//   };

//     const handlePrint = () => {
//     const printWindow = window.open('', '', 'height=600,width=800');
//     const printContent = `
//       <html>
//       <head>
//         <title>Retail Sale Invoice</title>
//         <style>
//           body { font-family: Arial, sans-serif; margin: 20px; padding: 0; color: blue; background-color: #f9f9f9; }
//           .invoice-container { width: 100%; max-width: 600px; margin: auto; border: 1px solid #ccc; padding: 20px; background-color: #fff; }
//           .header { text-align: center; padding: 20px 0; background-color: #4caf50; color: red; }
//           .header h1 { margin: 0; font-size: 24px; }
//           .section { margin-bottom: 20px; }
//           .section h2 { margin-bottom: 10px; font-size: 18px; color: #4caf50; }
//           .section p { margin: 5px 0; font-size: 14px; }
//           .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
//           .table th, .table td { border: 1px solid #ddd; padding: 10px; font-size: 14px; }
//           .table th { background-color: #f2f2f2; text-align: left; }
//           .footer { text-align: center; padding: 20px 0; background-color: #4caf50; color: red; font-size: 14px; }
//           .footer p { margin: 0; }
//         </style>
//       </head>
//       <body>
//         <div class="invoice-container">
//           <div class="header">
//             <h1>Retail Sale Receipt</h1>
//             <p>${salesDateTime}</p>
//           </div>
  
//           <div class="section">
//             <h2>Customer Information</h2>
//             <p><strong>Full Name:</strong> ${formData.fullName}</p>
//             <p><strong>Number:</strong> ${formData.number}</p>
//             <p><strong>Address:</strong> ${formData.address}</p>
//           </div>
  
//           <div class="section">
//             <h2>Item Information</h2>
//             <table class="table">
//               <tr>
//                 <th>Barcode</th>
//                 <td>${formData.barcode}</td>
//               </tr>
//               <tr>
//                 <th>Item Name</th>
//                 <td>${formData.itemName}</td>
//               </tr>
//               <tr>
//                 <th>Unit</th>
//                 <td>${formData.unit}</td>
//               </tr>
//               <tr>
//                 <th>Unit Price</th>
//                 <td>${formData.unitPrice}</td>
//               </tr>
//             </table>
//           </div>
  
//           <div class="section">
//             <h2>Pricing and Tax</h2>
//             <table class="table">
//               <tr>
//                 <th>Tax (%)</th>
//                 <td>${formData.tax}</td>
//               </tr>
//               ${isDiscountApplicable ? `
//                 <tr>
//                   <th>Discount (%)</th>
//                   <td>${formData.discount}</td>
//                 </tr>` : ''}
//               <tr>
//                 <th>Total Price</th>
//                 <td>${formData.totalPrice}</td>
//               </tr>
//             </table>
//           </div>
  
//           <div class="section">
//             <h2>Payment and Narration</h2>
//             <p><strong>Payment Method1:</strong> ${formData.paymentMethod1}</p>
//             <p><strong>Payment Method2:</strong> ${formData.paymentMethod2}</p>
//             <p><strong>Narration:</strong> ${formData.narration}</p>
//           </div>
  
//           <div class="footer">
//             <p>Thank you visit again!</p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `;
  
//     printWindow.document.open();
//     printWindow.document.write(printContent);
//     printWindow.document.close();
//     printWindow.print();
//   };
//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   submitFormData(); // Call your API function here
//   // };
  
  
//   // const submitFormData = async () => {
//   //   try {
//   //     // Send the formData to your backend API endpoint
//   //     const response = await api.post('/api/retailsale/create-order/', formData);
//   //     if (response.status === 200) {
//   //       console.log('Form data submitted successfully:', response.data);
//   //       alert('Sale recorded successfully!');
//   //     } else {
//   //       console.error('Failed to submit data:', response.data);
//   //       alert('There was an error recording the sale.');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error submitting form data:', error);
//   //     alert('An unexpected error occurred. Please try again later.');
//   //   }
//   // };
  

//   // const handleKeyDown = (e, index) => {
//   //   if (e.key === 'Enter') {
//   //     e.preventDefault(); // Prevent form submission
//   //     const nextIndex = index + 1;
//   //     if (nextIndex < inputRefs.current.length) {
//   //       inputRefs.current[nextIndex].focus(); // Move focus to the next input
//   //     }
//   //   }
//   // };

//   return (
//     <Container maxWidth="lg" sx={{ backgroundColor: '#f9dff5', position: 'relative' }}>
//       <Paper sx={{ p: 3, backgroundColor: '#f9dff5' }} elevation={0}>
//         <Typography variant="h5" gutterBottom align="center" color="secondary">Retail Sale & Return</Typography>
//         <Typography variant="body2" color="textSecondary" align="center">Sales Date & Time: {salesDateTime}</Typography>

//         {/* Notification and Print options */}
//         <Box sx={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 1 }}>
//           <IconButton onClick={handleSendNotification} sx={{ color: '#370140' }}>
//             <SendIcon />
//           </IconButton>
//           <IconButton onClick={handlePrint} sx={{ color: '#370140' }}>
//             <PrintIcon />
//           </IconButton>
//         </Box>

//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//           <Grid container spacing={2}>
//             {/* Item Information */}
//             <Grid item xs={12} md={3}>
//               <Typography variant="subtitle1" gutterBottom color="textPrimary">Item Information</Typography>
//               <TextField
//                 fullWidth
//                 label="Barcode"
//                 name="barcode"
//                 value={formData.barcode}
//                 onChange={handleChange}
//                 margin="normal"
//                 variant="outlined"
//                 inputRef={el => (inputRefs.current[0] = el)}
//                 onKeyDown={(e) => handleKeyDown(e, 0)}
//               />
//               <TextField
//                 fullWidth
//                 label="Item Name"
//                 name="itemName"
//                 value={formData.itemName}
//                 onChange={handleChange}
//                 margin="normal"
//                 variant="outlined"
//                 inputRef={el => (inputRefs.current[1] = el)}
//                 onKeyDown={(e) => handleKeyDown(e, 1)}
//               />
              
//               <TextField
//                 fullWidth
//                 label="Unit"
//                 name="unit"
//                 value={formData.unit}
//                 onChange={handleChange}
//                 margin="normal"
//                 variant="outlined"
//                 inputRef={el => (inputRefs.current[2] = el)}
//                 onKeyDown={(e) => handleKeyDown(e, 2)}
//               />
//               <TextField
//                 fullWidth
//                 label="Unit Price"
//                 name="unitPrice"
//                 value={formData.unitPrice}
//                 onChange={handleChange}
//                 margin="normal"
//                 type="number"
//                 variant="outlined"
//                 inputRef={el => (inputRefs.current[3] = el)}
//                 onKeyDown={(e) => handleKeyDown(e, 3)}
//               />
//             </Grid>

//             {/* Customer Information */}
//             <Grid item xs={12} md={3}>
//               <Typography variant="subtitle1" gutterBottom color="textPrimary">Customer Information</Typography>
//               <TextField
//                 fullWidth
//                 label="Full Name"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 margin="normal"
//                 variant="outlined"
//                 inputRef={el => (inputRefs.current[4] = el)}
//                 onKeyDown={(e) => handleKeyDown(e, 4)}
//               />
//               <TextField
//                 fullWidth
//                 label="Number"
//                 name="number"
//                 value={formData.number}
//                 onChange={handleChange}
//                 margin="normal"
//                 type="tel"
//                 variant="outlined"
//                 inputRef={el => (inputRefs.current[5] = el)}
//                 onKeyDown={(e) => handleKeyDown(e, 5)}
//               />
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={4}
//                 label="Address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 margin="normal"
//                 variant="outlined"
//                 inputRef={el => (inputRefs.current[6] = el)}
//                 onKeyDown={(e) => handleKeyDown(e, 6)}
//               />
//             </Grid>

//             {/* Pricing and Tax */}
//             <Grid item xs={12} md={3}>
//               <Typography variant="subtitle1" gutterBottom color="textPrimary">Pricing and Tax</Typography>
//               <TextField
//                 fullWidth
//                 label="Tax (%)"
//                 name="tax"
//                 value={formData.tax}
//                 onChange={handleChange}
//                 margin="normal"
//                 type="number"
//                 variant="outlined"
//                 inputRef={el => (inputRefs.current[7] = el)}
//                 onKeyDown={(e) => handleKeyDown(e, 7)}
//               />
//               <FormControl fullWidth margin="normal" variant="outlined">
//                 <InputLabel>Discount Applicable</InputLabel>
//                 <Select
//                   name="isDiscountApplicable"
//                   value={isDiscountApplicable ? 'Yes' : 'No'}
//                   onChange={(e) => setIsDiscountApplicable(e.target.value === 'Yes')}
//                   label="Discount Applicable"
//                 >
//                   <MenuItem value="No">No</MenuItem>
//                   <MenuItem value="Yes">Yes</MenuItem>
//                 </Select>
//               </FormControl>
//               {isDiscountApplicable && (
//                 <TextField
//                   fullWidth
//                   label="Discount (%)"
//                   name="discount"
//                   value={formData.discount}
//                   onChange={handleChange}
//                   margin="normal"
//                   type="number"
//                   variant="outlined"
//                   inputRef={el => (inputRefs.current[8] = el)}
//                   onKeyDown={(e) => handleKeyDown(e, 8)}
//                 />
//               )}
//               <TextField
//                 fullWidth
//                 label="Total Price"
//                 name="totalPrice"
//                 value={formData.totalPrice}
//                 margin="normal"
//                 InputProps={{
//                   readOnly: true,
//                   startAdornment: <InputAdornment position="start">₹</InputAdornment>,
//                 }}
//                 variant="outlined"
//                 inputRef={el => (inputRefs.current[9] = el)}
//                 onKeyDown={(e) => handleKeyDown(e, 9)}
//               />
//             </Grid>

//             {/* Payment and Narration */}
            
//                 {/* Payment Method 1 and Amount 1 */}
//                 <Grid item sm={2}>
//                   <FormControl fullWidth margin="normal" variant="outlined">
//                     <InputLabel>Payment Method 1</InputLabel>
//                     <Select
//                       name="paymentMethod1"
//                       value={formData.paymentMethod1}
//                       onChange={handleChange}
//                       label="Payment Method 1"
//                     >
//                       <MenuItem value="Cash">Cash</MenuItem>
//                       <MenuItem value="Credit Card">Credit Card</MenuItem>
//                       <MenuItem value="Debit Card">Debit Card</MenuItem>
//                       <MenuItem value="UPI">UPI</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={3}>
//                   <TextField
//                     fullWidth
//                     label="Payment Amount 1"
//                     name="amount1"
//                     value={formData.amount1}
//                     margin="normal"
                    
//                     InputProps={{
//                       startAdornment: <InputAdornment position="start">₹</InputAdornment>,
//                     }}
//                     variant="outlined"
//                     inputRef={(el) => (inputRefs.current[10] = el)}
//                     onKeyDown={(e) => handleKeyDown(e, 10)}
//                   />
//                 </Grid>

//                 {/* Payment Method 2 and Amount 2 */}
//                 <Grid item md={2}>
//                   <FormControl fullWidth margin="normal" variant="outlined">
//                     <InputLabel>Payment Method 2</InputLabel>
//                     <Select
//                       name="paymentMethod2"
//                       value={formData.paymentMethod2}
//                       onChange={handleChange}
//                       label="Payment Method 2"
//                     >
//                       <MenuItem value="Cash">Cash</MenuItem>
//                       <MenuItem value="Credit Card">Credit Card</MenuItem>
//                       <MenuItem value="Debit Card">Debit Card</MenuItem>
//                       <MenuItem value="UPI">UPI</MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Grid>
//                 <Grid item md={2}>
//                   <TextField
//                     fullWidth
//                     label="Payment Amount 2"
//                     name="amount2"
//                     value={formData.amount2}
//                     margin="normal"
                    
//                     InputProps={{
//                       startAdornment: <InputAdornment position="start">₹</InputAdornment>,
//                     }}
//                     variant="outlined"
//                     inputRef={(el) => (inputRefs.current[11] = el)}
//                     onKeyDown={(e) => handleKeyDown(e, 11)}
//                   />
//                 </Grid>
//               </Grid>
//           <Button
//                 type="submit"
//                 variant="contained"
//                 color="secondary"
//                 fullWidth
//                 sx={{ mt: 2 }}
//                 onClick={handleSubmit}
//               >
//                 Submit
//               </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// }

import React, { useState, useEffect, useRef } from 'react';


import { Box, Button, Grid, TextField, Typography, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,IconButton,FormControl,InputLabel,Select,MenuItem ,InputAdornment} from '@mui/material';

import { Send as SendIcon, Print as PrintIcon } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Container from '@mui/material/Container';
import dayjs from 'dayjs';
import api from "../../api";


export default function RetailSale() {
  const [formData, setFormData] = useState({
    fullName: '',
    number: '',
    address: '',
    // barcode: '',
    // itemName: '',
    // unit: '',
    // unitPrice: '',
    tax: '',
    discount: '',
    totalPrice: '',
    paymentMethod1: 'Cash',
    paymentMethod2: 'UPI',
    
    narration: ''
  });
  const [items, setItems] = useState([
    { barcode: '', itemName: '', unit: '', unitPrice: '' }
  ]);
  const [isDiscountApplicable, setIsDiscountApplicable] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null); // Track the expanded index
  const salesDateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const [modalOpen, setModalOpen] = useState(false);
  // const [previewItem, setPreviewItem] = useState(null);
  const [previewItems, setPreviewItems] = useState([]);
  
  const inputRefs = useRef([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    }, calculateTotalPrice);
  };

  useEffect(() => {
    const fetchData = async (barcode) => {
      if (!barcode) return; // Skip if barcode is empty
      try {
        console.log('Fetching data for barcode:', barcode); // Debugging log
        const response = await api.get(`api/barcode/get-barcode-details/${barcode}/`);
        console.log('API Response:', response.data); // Debugging log

        const data = response.data;
        if (data && data.item_details) {
          const { item_name, item_price } = data.item_details;
          setItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[0] = { ...updatedItems[0], itemName: item_name, unitPrice: item_price };
            return updatedItems;
          });
        } else {
          console.error('Item details not found in the response');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call fetchData whenever the barcode changes
    if (items[0].barcode) {
      fetchData(items[0].barcode);
    }
  }, [items[0].barcode]);

 

  // useEffect(() => {
  //     const fetchTotalPrice = async () => {
  //       try {
  //         // Send the necessary data to the backend for the total price calculation
  //         const response = await api.post('api/retailsale/calculate-total-price/', {
  //           unitPrice: items.unitPrice,
  //           unit:items.unit,
  //           tax: formData.tax,
  //           discount: formData.discount,
  //           isDiscountApplicable: isDiscountApplicable
  //         });
    
  //         // Check if response has the expected data
  //         if (response.data && response.data.totalPrice !== undefined) {
  //           setFormData(prev => ({
  //             ...prev,
  //             totalPrice: response.data.totalPrice.toFixed(2)
  //           }));
  //         }
  //       } catch (error) {
  //         console.error('Error fetching total price:', error);
  //       }
  //     };
    
  //     // Only call the API if the necessary data is available
  //     if (items.unitPrice !== undefined && formData.tax !== undefined && formData.discount !== undefined) {
  //       fetchTotalPrice();
  //     }
  //   }, [items.unitPrice, formData.tax, formData.discount, isDiscountApplicable]);
    
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    console.log('Items:', items);
  };

  const handleSendNotification = () => {
    alert('Notification sent!');
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      const nextIndex = index + 1;
      if (nextIndex < inputRefs.current.length) {
        inputRefs.current[nextIndex].focus(); // Move focus to the next input
      }
    }
  };

  const handleItemChange = (index, event) => {
    const newItems = [...items];
    newItems[index][event.target.name] = event.target.value;
    setItems(newItems);
  };

  const addItem = () => {
    if (items.length > 0) {
      const lastItem = items[items.length - 1];
      if (lastItem.barcode && lastItem.itemName && lastItem.unit && lastItem.unitPrice) {
        setPreviewItems((prevItems) => [...prevItems, lastItem]);
        setItems([{ barcode: '', itemName: '', unit: '', unitPrice: '' }]); // Reset input fields
      } else {
        alert("Please fill out all fields before adding.");
      }
    } else {
      alert("No items to add.");
    }
  };


  

const handlePrint = () => {
  const printWindow = window.open('', '', 'height=600,width=800');
  const currentDateTime = new Date().toLocaleString(); // Get current date and time
  
  const unitPrice = parseFloat(formData.unitPrice) || 0;
  const tax = parseFloat(formData.tax) || 0;
  const discount = parseFloat(formData.discount) || 0;
  const unit = parseFloat(formData.unit) || 0;

  // Calculate the base amount (unit * unitPrice)
  const baseAmount = unit * unitPrice;

  // Calculate tax amount based on the base amount
  const taxAmount = (baseAmount * tax) / 100;

  // Calculate total price after tax
  const totalAfterTax = baseAmount + taxAmount;

  // Calculate discount amount based on the total after tax
  const discountAmount = isDiscountApplicable ? (totalAfterTax * discount) / 100 : 0;

  // Final total price after applying discount
  const finalTotalPrice = totalAfterTax - discountAmount;

  const printContent = `
    <html>
    <head>
      <title>Retail Sale Invoice</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; padding: 0; color: blue; background-color: #f9f9f9; }
        hr { border: none; border-bottom: 2px solid blue; margin: 20px 0; }/
        .invoice-container { width: 100%; max-width: 600px; margin: auto; border: 1px solid #ccc; padding: 20px; background-color: #fff; }
        .header { text-align: center; padding: 20px 0; background-color: #4caf50; color: blue; }
        .header h1 { margin: 0; font-size: 24px; }
        .section { margin-bottom: 20px; }
        .section h2 { margin-bottom: 10px; font-size: 18px; color: #4caf50; }
        .section p { margin: 5px 0; font-size: 14px; }
        .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .table th, .table td { border: 1px solid #ddd; padding: 10px; font-size: 14px; }
        .table th { background-color: #f2f2f2; text-align: left; }
        .footer { text-align: center; padding: 20px 0; background-color: #4caf50; color: blue; font-size: 14px; }
        .footer p { margin: 0;}
        .flex-container { display: flex; justify-content: space-between; align-items: center; }
        .left-info { text-align: left; }
        .right-info { text-align: right; }
        .right-info p { margin: 0; }
        .pricing-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 14px;
        }
        .pricing-row span {
          padding: 0 10px;
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <div class="header">
          <h1>NAARI FASHIONS</h1>
          <h2>MARKET BUILDING UNIT-II</h2>
          <hr>
          <h2>GSTIN:21AXKPR9141G1ZD</h2>
          <br><br>
          <h4>Retail Invoice</h4>
        </div>
\

        <div class="section">
          <div class="flex-container">
            <div class="left-info">
              <p><strong>Full Name:</strong> ${formData.fullName}</p>
              <p><strong>Number:</strong> ${formData.number}</p>
            </div>
            <div class="right-info">
              <p><strong>Date:</strong> ${currentDateTime}</p>
              <p><strong>Invoice Number:</strong> ${formData.invoiceNumber || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Item Information</h2>
          <table class="table">
            <tr>
              <th>Sl#</th>
              <th>Particulars</th>
              <th>Qty</th>
              <th>Amount</th>
            </tr>
            <tr>
              <td>1</td>
              <td>${formData.itemName}</td>
              <td>${formData.unit}</td>
              <td>₹${totalAfterTax.toFixed(2)}</td> <!-- Updated to show total after tax -->
            </tr>
          </table>
        </div>

        <div class="section">
          <h2>Pricing and Tax</h2>
          <div class="pricing-row">
            <span>Total</span>
            <span>${formData.unit}</span>
            <span>₹ ${totalAfterTax.toFixed(2)}</span>
          </div>
          <!--<div class="pricing-row">
            <span>Tax:</span>
            <span>${tax}%</span>
            <span>+₹${taxAmount.toFixed(2)}</span>
          </div>-->
          ${isDiscountApplicable ? `
            <div class="pricing-row">
              <span>Discount:</span>
              <span>${formData.discount}%</span>
              <span>-₹${discountAmount.toFixed(2)}</span>
            </div>` : ''}
          <div class="pricing-row">
            <span><strong>Net Payable:</strong></span>
            <span><strong>₹${finalTotalPrice.toFixed(2)}</strong></span>
          </div>
        </div>

        <div class="section">
          <h2>Payment and Narration</h2>
          <p><strong>Payment Method1:</strong> ${formData.paymentMethod1} ₹ ${formData.paymentAmount1 || 0}</p>
          <p><strong>Payment Method2:</strong> ${formData.paymentMethod2} ₹ ${formData.paymentAmount2 || 0}</p>
          <p><strong>Narration:</strong> ${formData.narration}</p>
        </div>
        <div class="section">
        <h6>Terms & Condition</h6>
        <hr>
        <ul>
        <li>No cash return</li>
        <li>No Exchange without Bill</li>
        <li>Exchange within 7 days</li>
        <li>No Exchange on Satureday and Sunday</li>
        <li>Exchange within 12 p.m to 4 p.m only</li>
        <li>No Colour Guarantee on any item</li>
        </ul>
        </div>

        <div class="footer">
          <p>Thank you visit again!</p>
        </div>
      </div>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(printContent);
  printWindow.document.close();
  printWindow.print();
};

  
 
  const handlePreview = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  // Handler for keydown navigation (if needed)
  // const handleKeyDown = (e, index, fieldIndex) => {
  //   // Handle Enter key navigation, for example
  //   if (e.key === 'Enter' && fieldIndex < inputRefs.current.length - 1) {
  //     inputRefs.current[fieldIndex + 1].focus();
  //   }
  // };
  // const toggleExpand = (index) => {
  //   setExpandedIndex(expandedIndex === index ? null : index); // Toggle expanded state
  // };
  
   
  return (
    <Container maxWidth="lg" sx={{ backgroundColor: '#f9dff5', position: 'relative' }}>
      <Paper sx={{ p: 3, backgroundColor: '#f9dff5' }} elevation={0}>
        <Typography variant="h5" gutterBottom align="center" color="secondary">Retail Sale</Typography>
        <Typography variant="body2" color="textSecondary" align="center">Sales Date & Time: {salesDateTime}</Typography>

        {/* Notification and Print options */}
        <Box sx={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 1 }}>
          <IconButton onClick={handleSendNotification} sx={{ color: '#370140' }}>
            <SendIcon />
          </IconButton>
          <IconButton onClick={handlePrint} sx={{ color: '#370140' }}>
            <PrintIcon />
          </IconButton>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          {items.map((item, index) => (
            <Grid container spacing={2} key={index} style={{marginTop:"0.7px"}}>
              <Typography variant="subtitle1" gutterBottom color="textPrimary">
                Item Information {index + 1}
              </Typography>
              <TextField
                fullWidth
                label="Barcode"
                name="barcode"
                value={item.barcode}
                onChange={(e) => handleItemChange(index, e)}
                margin="normal"
                variant="outlined"
                inputRef={el => (inputRefs.current[0] = el)}
                onKeyDown={(e) => handleKeyDown(e, 0)}
              />
              <TextField
                fullWidth
                label="Item Name"
                name="itemName"
                value={item.itemName}
                onChange={(e) => handleItemChange(index, e)}
                margin="normal"
                variant="outlined"
                inputRef={el => (inputRefs.current[1] = el)}
                onKeyDown={(e) => handleKeyDown(e, 1)}
              />
              <TextField
                fullWidth
                label="Unit"
                name="unit"
                value={item.unit}
                onChange={(e) => handleItemChange(index, e)}
                margin="normal"
                variant="outlined"
                inputRef={el => (inputRefs.current[2] = el)}
                onKeyDown={(e) => handleKeyDown(e, 2)}
              />
              <TextField
                fullWidth
                label="Unit Price"
                name="unitPrice"
                value={item.unitPrice}
                onChange={(e) => handleItemChange(index, e)}
                margin="normal"
                variant="outlined"
                inputRef={el => (inputRefs.current[3] = el)}
                onKeyDown={(e) => handleKeyDown(e, 3)}
              />
              {/* Optional line for visual separation */}
              {index !== items.length - 1 && <hr style={{ margin: '10px 0' }} />}
            </Grid>
          ))}
          <Grid>
          <Button
            variant="contained"
            color="secondary"
            onClick={addItem}
            style={{
              marginTop: '20px',
              borderRadius: '50%',
              height: '60px',
              width: '60px',
              padding: 0,
            }}
          >
            <AddIcon style={{ fontSize: '32px', fontWeight: 'bold' }} />
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handlePreview} // Preview last added item
            style={{ marginTop: '20px', marginLeft: '20px' }}
          >
            Preview
          </Button>
          </Grid>

        </Grid>
      

      {/* Modal for Preview */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            overflowY: 'auto',
            maxHeight: '400px',
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom style={{color:"secondary"}}>
            Preview Items
            <IconButton onClick={handleCloseModal} style={{ float: 'right' }}>
              <CloseIcon />
            </IconButton>
          </Typography>

         {Array.isArray(previewItems) && previewItems.length === 0 ? (
  <Typography variant="body1">No items added yet.</Typography>
) : (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
        <TableCell  style={{ color:"secondary"}}>Sl.No</TableCell>
          <TableCell style={{ color:"secondary"}}>Barcode</TableCell>
          <TableCell style={{ color:"secondary"}}>Item Name</TableCell>
          <TableCell style={{ color:"secondary"}}>Unit</TableCell>
          <TableCell style={{ color:"secondary"}}>Unit Price</TableCell>
          <TableCell style={{ color:"secondary"}}>Total Item Price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {previewItems.map((item, index) => (
          <TableRow key={index}>
      <TableCell style={{ textAlign: "center",  color: "secondary"}}>{index + 1}</TableCell>
      <TableCell style={{ textAlign: "center" }}>{item.barcode}</TableCell>
      <TableCell style={{ textAlign: "center" }}>{item.itemName}</TableCell>
      <TableCell style={{ textAlign: "center" }}>{item.unit}</TableCell>
      <TableCell style={{ textAlign: "center" }}>{item.unitPrice}</TableCell>
      <TableCell style={{ textAlign: "center" }}>
        {Number(item.unit) * Number(item.unitPrice)}
      </TableCell> {/* Calculate total price here */}
    </TableRow>
        ))}
        {/* Calculate the grand total */}
        <TableRow>
    <TableCell colSpan={5} align="right"><strong>Grand Total:</strong></TableCell>
    <TableCell style={{ textAlign: "center" }}>
      {previewItems.reduce((total, item) => total + (Number(item.unit) * Number(item.unitPrice)), 0)}
    </TableCell>
  </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
)}

        </Box>
      </Modal>

            {/* Customer Information */}
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1" gutterBottom color="textPrimary">Customer Information</Typography>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                inputRef={el => (inputRefs.current[4] = el)}
                onKeyDown={(e) => handleKeyDown(e, 4)}
              />
              <TextField
                fullWidth
                label="Number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                margin="normal"
                type="tel"
                variant="outlined"
                inputRef={el => (inputRefs.current[5] = el)}
                onKeyDown={(e) => handleKeyDown(e, 5)}
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                inputRef={el => (inputRefs.current[6] = el)}
                onKeyDown={(e) => handleKeyDown(e, 6)}
              />
            </Grid>

            {/* Pricing and Tax */}
            <Grid item xs={12} md={3}>
              <Typography variant="subtitle1" gutterBottom color="textPrimary">Pricing and Tax</Typography>
              <TextField
                fullWidth
                label="Tax (%)"
                name="tax"
                value={formData.tax}
                onChange={handleChange}
                margin="normal"
                
                variant="outlined"
                inputRef={el => (inputRefs.current[7] = el)}
                onKeyDown={(e) => handleKeyDown(e, 7)}
              />
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel>Discount Applicable</InputLabel>
                <Select
                  name="isDiscountApplicable"
                  value={isDiscountApplicable ? 'Yes' : 'No'}
                  onChange={(e) => setIsDiscountApplicable(e.target.value === 'Yes')}
                  label="Discount Applicable"
                >
                  <MenuItem value="No">No</MenuItem>
                  <MenuItem value="Yes">Yes</MenuItem>
                </Select>
              </FormControl>
              {isDiscountApplicable && (
                <TextField
                  fullWidth
                  label="Discount (%)"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  margin="normal"
                  type="number"
                  variant="outlined"
                  inputRef={el => (inputRefs.current[8] = el)}
                  onKeyDown={(e) => handleKeyDown(e, 8)}
                />
              )}
              <TextField
                fullWidth
                label="Total Price"
                name="totalPrice"
                value={formData.totalPrice}
                margin="normal"
                InputProps={{
                  readOnly: true,
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                variant="outlined"
                inputRef={el => (inputRefs.current[9] = el)}
                onKeyDown={(e) => handleKeyDown(e, 9)}
              />
            </Grid>


 {/* Payment and Narration */}
   <Grid item xs={12} md={3}>
      <Typography variant="subtitle1" gutterBottom color="textPrimary">
         Payment and Narration
      </Typography>
              <Grid container spacing={2}>
                {/* Payment Method 1 and Amount 1 */}
                <Grid item xs={6}>
                  <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel>Payment Method 1</InputLabel>
                    <Select
                      name="paymentMethod1"
                      value={formData.paymentMethod1}
                      onChange={handleChange}
                      label="Payment Method 1"
                    >
                      <MenuItem value="Cash">Cash</MenuItem>
                      <MenuItem value="Credit Card">Credit Card</MenuItem>
                      <MenuItem value="Debit Card">Debit Card</MenuItem>
                      <MenuItem value="UPI">UPI</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Payment Amount 1"
                    name="amount1"
                    value={formData.amount1}
                    margin="normal"
                    
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                    variant="outlined"
                    inputRef={(el) => (inputRefs.current[10] = el)}
                    onKeyDown={(e) => handleKeyDown(e, 10)}
                  />
                </Grid>

                {/* Payment Method 2 and Amount 2 */}
                <Grid item xs={6}>
                  <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel>Payment Method 2</InputLabel>
                    <Select
                      name="paymentMethod2"
                      value={formData.paymentMethod2}
                      onChange={handleChange}
                      label="Payment Method 2"
                    >
                      <MenuItem value="Cash">Cash</MenuItem>
                      <MenuItem value="Credit Card">Credit Card</MenuItem>
                      <MenuItem value="Debit Card">Debit Card</MenuItem>
                      <MenuItem value="UPI">UPI</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Payment Amount 2"
                    name="amount2"
                    value={formData.amount2}
                    margin="normal"
                    
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                    variant="outlined"
                    inputRef={(el) => (inputRefs.current[11] = el)}
                    onKeyDown={(e) => handleKeyDown(e, 11)}
                  />
                </Grid>
              </Grid>

              {/* Narration Field */}
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Narration"
                name="narration"
                value={formData.narration}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                inputRef={(el) => (inputRefs.current[12] = el)}
                onKeyDown={(e) => handleKeyDown(e, 12)}
              />
            </Grid>
          </Grid>
          <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
        </Box>
      </Paper>
    </Container>
  );
}
