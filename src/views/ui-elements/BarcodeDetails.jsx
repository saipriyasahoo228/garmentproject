
// import React, { useState, useRef } from 'react';
// import {
//   TextField,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Modal,
//   Box,
//   Typography,
//   Alert
// } from '@mui/material';

// export default function StockEntry() {
//   const [barcode, setBarcode] = useState('');
//   const [itemName, setItemName] = useState('');
//   const [itemDetails, setItemDetails] = useState({ name: '', description: '', mrp: '', stock: '' });
//   const [quantity, setQuantity] = useState('');
//   const [itemMRP, setItemMRP] = useState('');
//   const [stockEntries, setStockEntries] = useState([]);
//   const [error, setError] = useState('');
//   const [openModal, setOpenModal] = useState(false);

//   // Create refs for each input field
//   const barcodeRef = useRef();
//   const itemNameRef = useRef();
//   const modalItemNameRef = useRef();
//   const modalDescriptionRef = useRef();
//   const modalMRPRef = useRef();
//   const modalQuantityRef = useRef();
//   const modalItemMRPRef = useRef();

//   // Handle barcode/item change and fetch item details
//   const handleItemSearch = () => {
//     // if (barcode || itemName) {
//       // Open modal to fill details
//       setOpenModal(true);
//     // } else {
//     //   setError('Please enter a barcode or item name.');
//     // }
//   };

//   // Handle form submission within the modal
//   const handleModalSubmit = () => {
//     if (!quantity || !itemMRP || !itemDetails.name || !itemDetails.mrp) {
//       setError('Please fill in all fields.');
//       return;
//     }
//     setStockEntries([
//       ...stockEntries,
//       { barcode, itemName: itemDetails.name, description: itemDetails.description, quantity, itemMRP }
//     ]);
//     setOpenModal(false);
//     setBarcode('');
//     setItemName('');
//     setQuantity('');
//     setItemMRP('');
//     setItemDetails({ name: '', description: '', mrp: '', stock: '' });
//     setError('');
//   };

//   // Handle saving stock entries
//   const handleSaveEntries = () => {
//     if (stockEntries.length === 0) {
//       setError('No stock entries to save.');
//       return;
//     }
//     // Save stockEntries to database or local storage
//     console.log('Saving stock entries:', stockEntries);
//     setStockEntries([]);
//   };

//   // Function to handle Enter key press for input navigation
//   const handleKeyPress = (e, nextRef) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       if (nextRef && nextRef.current) {
//         nextRef.current.focus();
//       }
//     }
//   };

//   return (
//     <div>
//       <Box sx={{ backgroundColor: '#f9dff5', padding: '20px' }}>
//         {/* <TextField
//           label="Barcode"
//           value={barcode}
//           onChange={(e) => setBarcode(e.target.value)}
//           margin="normal"
//           sx={{ margin: '5px' }}
//           inputRef={barcodeRef}
//           onKeyDown={(e) => handleKeyPress(e, itemNameRef)}
//         />
//         <TextField
//           label="Item Name"
//           value={itemName}
//           onChange={(e) => setItemName(e.target.value)}
//           margin="normal"
//           sx={{ margin: '5px' }}
//           inputRef={itemNameRef}
//           onKeyDown={(e) => handleKeyPress(e, null)} // Add the next ref if needed
//         />
//          */}
//         <Button onClick={handleItemSearch} variant="contained" color="secondary" sx={{ marginTop: '30px', margin: '5px' }}>
//           Search
//         </Button>
//         {/* {error && <Alert severity="error">{error}</Alert>} */}
//       </Box>

//       <Modal
//         open={openModal}
//         onClose={() => setOpenModal(false)}
//         aria-labelledby="modal-title"
//         aria-describedby="modal-description"
//       >
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 400,
//             bgcolor: '#f9dff5',
//             border: '2px solid #000',
//             boxShadow: 24,
//             p: 4,
//           }}
//         >
//           <Typography id="modal-title" variant="h6" component="h2">
//             Enter Stock Details
//           </Typography>
        
//           <TextField
//             label="Item Name"
//             value={itemDetails.name}
//             onChange={(e) => setItemDetails({ ...itemDetails, name: e.target.value })}
//             margin="normal"
//             fullWidth
//             inputRef={modalItemNameRef}
//             onKeyDown={(e) => handleKeyPress(e, modalDescriptionRef)}
//           />
//           <TextField
//             label="Description"
//             value={itemDetails.description}
//             onChange={(e) => setItemDetails({ ...itemDetails, description: e.target.value })}
//             margin="normal"
//             fullWidth
//             inputRef={modalDescriptionRef}
//             onKeyDown={(e) => handleKeyPress(e, modalMRPRef)}
//           />
//           <TextField
//             label="Item Price"
//             type="number"
//             value={itemDetails.mrp}
//             onChange={(e) => setItemDetails({ ...itemDetails, mrp: e.target.value })}
//             margin="normal"
//             fullWidth
//             inputRef={modalMRPRef}
//             onKeyDown={(e) => handleKeyPress(e, modalQuantityRef)}
//           />
//           <TextField
//             label="Quantity"
//             type="number"
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//             margin="normal"
//             fullWidth
//             inputRef={modalQuantityRef}
//             onKeyDown={(e) => handleKeyPress(e, modalItemMRPRef)}
//           />
//           <TextField
//             label="Item MRP"
//             type="number"
//             value={itemMRP}
//             onChange={(e) => setItemMRP(e.target.value)}
//             margin="normal"
//             fullWidth
//             inputRef={modalItemMRPRef}
//             onKeyDown={(e) => handleKeyPress(e, null)} // Add the next ref if needed
//           />
//           <Button onClick={handleModalSubmit} variant="contained" color="secondary">
//             Save
//           </Button>
//         </Box>
//       </Modal>

//       <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Barcode</TableCell>
//               <TableCell>Item Name</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Quantity</TableCell>
//               <TableCell>Item MRP</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {stockEntries.map((entry, index) => (
//               <TableRow key={index}>
//                 <TableCell>{entry.barcode}</TableCell>
//                 <TableCell>{entry.itemName}</TableCell>
//                 <TableCell>{entry.description}</TableCell>
//                 <TableCell>{entry.quantity}</TableCell>
//                 <TableCell>{entry.itemMRP}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }
// import React, { useState, useEffect } from 'react';
// import {
//   TextField,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Modal,
//   Box,
//   Typography,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Alert
// } from '@mui/material';
// import api from "../../api"; // Assumed Axios instance

// export default function StockEntry() {
//   const [barcode, setBarcode] = useState('');
//   const [itemDetails, setItemDetails] = useState({ name: '', description: '', stock: '', item_size: '', shop_name: '', itemPrice: '' });
//   const [quantity, setQuantity] = useState('');
//   const [itemSize, setItemSize] = useState('');
//   const [shopName, setShopName] = useState('');
//   const [itemPrice, setItemPrice] = useState('');
//   const [categoryName, setCategoryName] = useState('');
//   const [itemName, setItemName] = useState('');
//   const [stockEntries, setStockEntries] = useState([]);
//   const [error, setError] = useState('');
//   const [openModal, setOpenModal] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch all stock entries and categories on component mount
//   useEffect(() => {
//       // Fetch stock entries
//       api.get("api/barcode/code/")
//       .then((response) => {
//         console.log('Stock entries response:', response.data);
//         if (Array.isArray(response.data.barcodes)) {
//           setStockEntries(response.data.barcodes);
//         } else {
//           console.error('Expected an array under "barcodes", but got:', response.data);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching stock entries:', error);
//       });


//     api.get("api/user/categories/")
//       .then((response) => {
//         setCategories(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching categories:', error);
//         setLoading(false);
//       });
//   }, []);
  
//   // if (loading) {
//   //   return <Typography>Loading categories...</Typography>;
//   // }

//   useEffect(() => {
//     // Fetch items based on the selected category
//     if (categoryName) {
//       api.get(`api/user/subcategories/${categoryName}`)
//         .then((response) => setItems(response.data))
//         .catch((error) => console.error('Error fetching items:', error));
//     }
//   }, [categoryName]);

//   const handleModalSubmit = () => {
//     if (!quantity || !itemName || !itemSize || !shopName || !categoryName) {
//       setError('Please fill in all fields.');
//       return;
//     }

//     const newEntry = {
//       item_name: itemName,
//       quantity: quantity ? parseInt(quantity, 10) : null,
//       item_price: itemPrice ? parseFloat(itemPrice) : null,
//       item_size: itemSize,
//       shop_name: shopName,
//       category_name: categoryName
//     };

//     // Add entry via API
//     api.post('api/barcode/code/', newEntry)
//       .then((response) => {
//         setStockEntries([...stockEntries, response.data]);
//         resetForm();
//       })
//       .catch((error) => console.error('Error adding stock entry:', error));
//   };

//   const resetForm = () => {
//     setBarcode('');
//     setItemDetails({ name: '', description: '', stock: '', item_size: '', shop_name: '', itemPrice: '' });
//     setQuantity('');
//     setItemSize('');
//     setShopName('');
//     setItemPrice('');
//     setCategoryName('');
//     setItemName('');
//     setError('');
//     setOpenModal(false);
//   };

//   return (
//     <div>
//       <Box sx={{ padding: '20px' }}>
//         <Button onClick={() => setOpenModal(true)} variant="contained" color="secondary" sx={{ marginTop: '30px', margin: '5px' }}>
//           Add Stock
//         </Button>
//       </Box>

//       <Modal open={openModal} onClose={() => setOpenModal(false)}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 700,
//             bgcolor: '#f9dff5',
//             border: '2px solid #000',
//             boxShadow: 24,
//             p: 4
//           }}
//         >
//           <Typography variant="h6">Enter Stock Details</Typography>
//           <FormControl fullWidth margin="normal">
//   <InputLabel>Category</InputLabel>
//   <Select
//     value={categoryName}
//     onChange={(e) => setCategoryName(e.target.value)}
//   >
//     {Array.isArray(categories) && categories.length > 0 ? (
//       categories.map((category) => (
//         <MenuItem key={category.id} value={category.category_name}>{category.category_name}</MenuItem>
//       ))
//     ) : (
//       <MenuItem disabled>No categories available</MenuItem>
//     )}
//   </Select>
// </FormControl>

//           <FormControl fullWidth margin="normal">
//             <InputLabel>Item Name</InputLabel>
//             <Select
//               value={itemName}
//               onChange={(e) => setItemName(e.target.value)}
//             >
//               {items.map((item) => (
//                 <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <TextField
//             label="Quantity"
//             type="number"
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//             margin="normal"
//             fullWidth
//           />
//           <TextField
//             label="Item Price"
//             value={itemPrice}
//             onChange={(e) => setItemPrice(e.target.value)}
//             margin="normal"
//             fullWidth
//           />
//           <TextField
//             label="Item Size"
//             value={itemSize}
//             onChange={(e) => setItemSize(e.target.value)}
//             margin="normal"
//             fullWidth
//           />
//           <TextField
//             label="Shop Name"
//             value={shopName}
//             onChange={(e) => setShopName(e.target.value)}
//             margin="normal"
//             fullWidth
//           />
//           <Button onClick={handleModalSubmit} variant="contained" color="secondary" sx={{ mt: 2 }}>
//             Save
//           </Button>
//         </Box>
//       </Modal>

//       <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//             <TableCell>SL.No</TableCell>
//               <TableCell>Barcode</TableCell>
//               <TableCell>Item Name</TableCell>
//               {/* <TableCell>Quantity</TableCell> */}
//               <TableCell>Item Size</TableCell>
//               <TableCell>Shop Name</TableCell>
//               <TableCell>Category Name</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//   {Array.isArray(stockEntries) && stockEntries.length > 0 ? (
//     stockEntries.map((entry,index) => (
//       <TableRow key={entry.id}>
//         <TableCell>{index+1}</TableCell>
//         <TableCell>{entry.serial_number}</TableCell>
//         <TableCell>{entry.item_name}</TableCell>
//         {/* <TableCell>{entry.quantity}</TableCell> */}
//         <TableCell>{entry.item_size}</TableCell>
//         <TableCell>{entry.shop_name}</TableCell>
//         <TableCell>{entry.category_name}</TableCell>
//       </TableRow>
//     ))
//   ) : (
//     <TableRow>
//       <TableCell colSpan={6}>No stock entries available</TableCell>
//     </TableRow>
//   )}
// </TableBody>

//         </Table>
//       </TableContainer>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  Alert
} from '@mui/material';
import api from '../../api'; // Assumed Axios instance
import NavRight from 'layouts/AdminLayout/NavBar/NavRight';

export default function StockEntry() {
  const [barcode, setBarcode] = useState('');
  const [itemDetails, setItemDetails] = useState({});
  const [quantity, setQuantity] = useState('');
  const [itemSize, setItemSize] = useState('');
  const [shopName, setShopName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [itemName, setItemName] = useState('');
  const [stockEntries, setStockEntries] = useState([]);
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]); // Selected rows
  const [previewModal, setPreviewModal] = useState(false); // Preview modal state

  // Fetch stock entries and categories on component mount
  useEffect(() => {
    api.get('api/barcode/code/')
      .then((response) => {
        setStockEntries(response.data.barcodes || []);
      })
      .catch((error) => {
        console.error('Error fetching stock entries:', error);
      });

    api.get('api/user/categories/')
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (categoryName) {
      api.get(`api/user/subcategories/${categoryName}`)
        .then((response) => setItems(response.data))
        .catch((error) => console.error('Error fetching items:', error));
    }
  }, [categoryName]);

  const handleCheckboxChange = (e, item) => {
    if (e.target.checked) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((selected) => selected.id !== item.id));
    }
  };

  const handlePreview = () => {
    if (selectedItems.length === 0) {
      setError('No items selected for preview.');
      return;
    }
    setError('');
    setPreviewModal(true);
  };

  const handleModalSubmit = () => {
    if (!quantity || !itemName || !itemSize || !shopName || !categoryName) {
      setError('Please fill in all fields.');
      return;
    }

    const newEntry = {
      item_name: itemName,
      quantity: quantity ? parseInt(quantity, 10) : null,
      item_price: itemPrice ? parseFloat(itemPrice) : null,
      item_size: itemSize,
      shop_name: shopName,
      category_name: categoryName
    };

    api.post('api/barcode/code/', newEntry)
      .then((response) => {
        setStockEntries([...stockEntries, response.data]);
        resetForm();
      })
      .catch((error) => console.error('Error adding stock entry:', error));
  };

  const resetForm = () => {
    setBarcode('');
    setItemDetails({});
    setQuantity('');
    setItemSize('');
    setShopName('');
    setItemPrice('');
    setCategoryName('');
    setItemName('');
    setError('');
    setOpenModal(false);
  };

  return (
    <div>
      <Box 
  sx={{ 
    padding: '20px', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  }}
>
  <Button 
    onClick={() => setOpenModal(true)} 
    variant="contained" 
    color="secondary" 
    sx={{ marginRight: '10px' }}
  >
    Add Barcode
  </Button>
  <Box>
    <Button 
      onClick={handlePreview} 
      variant="contained" 
      color="primary" 
      sx={{ marginRight: '10px' }}
    >
      Preview
    </Button>
    <Button 
      onClick={() => window.print()} 
      variant="contained" 
      color="secondary"
    >
      Print
    </Button>
  </Box>
  {error && <Alert severity="error" sx={{ marginTop: '10px' }}>{error}</Alert>}
</Box>

      {/* </Box> */}

      {/* Modal for adding stock */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 700,
            bgcolor: '#f9dff5',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography variant="h6">Enter Stock Details</Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select value={categoryName} onChange={(e) => setCategoryName(e.target.value)}>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.category_name}>{category.category_name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Item Name</InputLabel>
            <Select value={itemName} onChange={(e) => setItemName(e.target.value)}>
              {items.map((item) => (
                <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Item Price"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Item Size"
            value={itemSize}
            onChange={(e) => setItemSize(e.target.value)}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Shop Name"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            margin="normal"
            fullWidth
          />
          <Button onClick={handleModalSubmit} variant="contained" color="secondary" sx={{ mt: 2 }}>
            Save
          </Button>
        </Box>
      </Modal>

      {/* Preview modal */}
      <Modal open={previewModal} onClose={() => setPreviewModal(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: '20px' }}>
            Barcode Preview
          </Typography>
          {stockEntries.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              {/* <img src={item.barcode_image} alt="Barcode" style={{ width: '200px', marginRight: '10px' }} /> */}
              <Typography>{item.barcode_image}</Typography>
              <Typography>{item.item_name}</Typography>
            </Box>
          ))}
        </Box>
      </Modal>

      <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>Select</TableCell>
              <TableCell>SL. No</TableCell>
              <TableCell>Barcode</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Item Size</TableCell>
              <TableCell>Shop Name</TableCell>
              <TableCell>Category Name</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {stockEntries.map((entry, index) => (
              <TableRow key={entry.id}>
                 <TableCell>
                  <Checkbox
                    onChange={(e) => handleCheckboxChange(e, entry)}
                    checked={selectedItems.includes(entry)}
                  />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{entry.serial_number}</TableCell>
                <TableCell>{entry.item_name}</TableCell>
                <TableCell>{entry.item_size}</TableCell>
                <TableCell>{entry.shop_name}</TableCell>
                <TableCell>{entry.category_name}</TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
