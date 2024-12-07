// import React, { useState, useRef, useEffect } from 'react';
// import {
//   TextField, Button, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Paper,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, MenuItem, Select, InputLabel, FormControl
// } from '@mui/material';
// import { Edit, Delete } from '@mui/icons-material';
// import api from "../../../api"; // Ensure to import your API instance

// export default function ItemMaster() {
//   const [itemDetails, setItemDetails] = useState({
//     item_name: '',
//     item_code: '',
//     category_item: '',
//     hsn_code: '',
//     unit_price: '',
//     stock_quantity: '',
//     description: ''
//   });

//   const [itemList, setItemList] = useState([]);
//   const [categories, setCategories] = useState([]);  
//   const [loading, setLoading] = useState({ add: false });
//   const [open, setOpen] = useState(false);
//   const [editIndex, setEditIndex] = useState(null);
//   const [deleteIndex, setDeleteIndex] = useState(null);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const fieldRefs = useRef([]);

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await api.get('/api/user/items/'); // Replace with your actual endpoint
//         setItemList(response.data.data);
//       } catch (error) {
//         console.error("Error fetching items:", error);
//       }
//     };

//     const fetchCategories = async () => {
//       try {
//         const response = await api.get('/api/user/categories/minimal/'); // Endpoint to fetch categories
//         setCategories(response.data.data); // Update state with categories from backend
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchItems();
//     fetchCategories(); // Fetch categories when component mounts
//   }, []);

//   const handleChange = (e) => {
//     setItemDetails({
//       ...itemDetails,
//       [e.target.name]: e.target.value  // This should update 'category' with the selected 'name'
//     });
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//     setEditIndex(null);
//     setItemDetails({
//       item_name: '',
//       item_code: '',
//       category_item: '',
//       hsn_code: '',
//       unit_price: '',
//       stock_quantity: '',
//       description: ''
//     });
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleAddOrUpdate = async (e) => {
//     e.preventDefault();
//     setLoading({ ...loading, add: true });
  
//     try {
//       if (editIndex !== null) {
//         // Update item
//         await api.put(`/api/user/items/${itemDetails.item_code}/`, itemDetails); // Replace with your actual endpoint
//         const updatedList = [...itemList];
//         updatedList[editIndex] = { ...itemList[editIndex], ...itemDetails };
//         setItemList(updatedList);
//       } else {
//         // Add new item
//         const response = await api.post('/api/user/items/', itemDetails); // Replace with your actual endpoint
//         setItemList([...itemList, response.data]);
//       }
//     } catch (error) {
//       console.error("Error adding/updating item:", error);
//     } finally {
//       setLoading({ ...loading, add: false });
//       handleClose();
//     }
//   };

//   const handleEdit = (index) => {
//     setEditIndex(index);
//     setItemDetails(itemList[index]);
//     setOpen(true);
//   };

//   const handleDeleteDialogOpen = (index) => {
//     setDeleteIndex(index);
//     setDeleteDialogOpen(true);
//     setItemDetails(itemList[index]);
//   };

//   const handleDeleteDialogClose = () => {
//     setDeleteDialogOpen(false);
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       await api.delete(`/api/user/items/${itemDetails.item_code}/`,itemDetails ); // Replace with your actual endpoint
//       const updatedList = itemList.filter((_, i) => i !== deleteIndex);
//       setItemList(updatedList);
//     } catch (error) {
//       console.error("Error deleting item:", error);
//     } finally {
//       setDeleteDialogOpen(false);
//     }
//   };
  
//   const handleKeyDown = (e, index) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       const nextIndex = index + 1;
//       if (fieldRefs.current[nextIndex]) {
//         fieldRefs.current[nextIndex].focus();
//       }
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: '100%', padding: 2 }}>
//       <Button variant="contained" color="secondary" onClick={handleClickOpen}>
//         Add Item
//       </Button>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle style={{ backgroundColor: '#f9dff5' }}>{editIndex !== null ? 'Edit Item Details' : 'Add Item Details'}</DialogTitle>
//         <DialogContent style={{ backgroundColor: '#f9dff5' }}>
//           <Paper sx={{ padding: "10px", backgroundColor: "#f9dff5" }} elevation={0}>
//             <form>
//             {Object.keys(itemDetails).map((field, index) => (
//                 field === 'category_item' ? (
//                   <FormControl fullWidth margin="normal" required key={field}>
//                     <InputLabel>Category</InputLabel>
//                     <Select
//                       value={itemDetails.category_item} 
//                       name="category_item"
//                       onChange={handleChange}
//                       label="Category"
//                       inputRef={el => (fieldRefs.current[index] = el)}
//                       onKeyDown={(e) => handleKeyDown(e, index)}
//                     >
//                       {categories.map(category => (
//                         <MenuItem key={category.id} value={category.category_name}>
//                           {category.category_name}
//                         </MenuItem>
//                       ))}
//                     </Select>
                    
//                   </FormControl>
                 
//                 ) : (
//                   <TextField
//                     fullWidth
//                     key={field}
//                     label={field.replace('_', ' ').toUpperCase()}
//                     name={field}
//                     value={itemDetails[field]}
//                     onChange={handleChange}
//                     margin="normal"
//                     inputRef={el => (fieldRefs.current[index] = el)}
//                     onKeyDown={(e) => handleKeyDown(e, index)}
//                     type={['unit_price', 'stock_quantity'].includes(field) ? 'number' : 'text'}
//                   />
//                 )
//               ))}
//             </form>
//           </Paper>
         
//         </DialogContent>
//         <DialogActions style={{ backgroundColor: '#f9dff5' }}>
//           <Button onClick={handleClose} color="error">
//             Cancel
//           </Button>
//           <Button onClick={handleAddOrUpdate} color="secondary" disabled={loading.add}>
//             {loading.add ? <CircularProgress size={24} /> : editIndex !== null ? 'Update' : 'Add'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>Are you sure you want to delete this item?</DialogContent>
//         <DialogActions>
//           <Button onClick={handleDeleteDialogClose} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleConfirmDelete} color="error">
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* <TableContainer component={Paper} sx={{ marginTop: 3 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               {['Item Name', 'Item Code', 'Category', 'HSN Code', 'Unit Price', 'Stock Quantity', 'Description', 'Actions'].map(header => (
//                 <TableCell key={header}>{header}</TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//           {Array.isArray(itemList) && itemList.map((item, index) => (
//               <TableRow >
//                 {Object.values(item).map((value, idx) => (
//                   <TableCell key={idx}>{value}</TableCell>
//                 ))}
//                 <TableCell>
//                   <IconButton color="secondary" onClick={() => handleEdit(index)}>
//                     <Edit />
//                   </IconButton>
//                   <IconButton color="error" onClick={() => handleDeleteDialogOpen(index)}>
//                     <Delete />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer> */}
//       <TableContainer component={Paper} sx={{ marginTop: 3 }}>
//   <Table>
//     <TableHead>
//       <TableRow>
//         {['Item Name', 'Item Code', 'Category', 'HSN Code', 'Unit Price', 'Stock Quantity', 'Description', 'Actions'].map(header => (
//           <TableCell key={header}>{header}</TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//     <TableBody>
//       {Array.isArray(itemList) && itemList.map((item, index) => (
//         <TableRow key={index}>
//           {/* Display only the specific fields */}
//           <TableCell>{item.item_name}</TableCell>
//           <TableCell>{item.item_code}</TableCell>
//           <TableCell>{item.category_item}</TableCell>
//           <TableCell>{item.hsn_code}</TableCell>
//           <TableCell>{item.unit_price}</TableCell>
//           <TableCell>{item.stock_quantity}</TableCell>
//           <TableCell>{item.description}</TableCell>
//           <TableCell>
//             <IconButton color="secondary" onClick={() => handleEdit(index)}>
//               <Edit />
//             </IconButton>
//             <IconButton color="error" onClick={() => handleDeleteDialogOpen(index)}>
//               <Delete />
//             </IconButton>
//           </TableCell>
//         </TableRow>
//       ))}
//     </TableBody>
//   </Table>
// </TableContainer>

//     </Box>
//   );
// }
import React, { useState, useRef, useEffect } from 'react';
import {
  TextField, Button, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import api from "../../../api"; // Ensure to import your API instance

export default function ItemMaster() {
  const [itemDetails, setItemDetails] = useState({
    item_name: '',
    item_code: '',
    category_name: '',
    sub_category_name: '',
    hsn_code: '',
    unit_price: '',
    stock_quantity: '',
    description: ''
  });

  const [itemList, setItemList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState({ add: false });
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const fieldRefs = useRef([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get('/api/user/items/');
        setItemList(response.data.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/user/categories/');
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchItems();
    fetchCategories();
  }, []);

  const handleCategoryChange = async (e) => {
    const selectedCategory = e.target.value;
    setItemDetails({ ...itemDetails, category_name: selectedCategory, sub_category_name: '' });

    try {
      const response = await api.get(`/api/user/subcategories/${selectedCategory}/`);
      setSubCategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleChange = (e) => {
    setItemDetails({
      ...itemDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
    setEditIndex(null);
    setItemDetails({
      item_name: '',
      item_code: '',
      category_name: '',
      sub_category_name: '',
      hsn_code: '',
      unit_price: '',
      stock_quantity: '',
      description: ''
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, add: true });

    try {
      if (editIndex !== null) {
        const response = await api.put(`/api/user/items/${itemDetails.item_code}/`, itemDetails);
        const updatedList = [...itemList];
        updatedList[editIndex] = { ...itemList[editIndex], ...itemDetails };
        setItemList(updatedList);
        alert(response.data.message);
      } else {
        const response = await api.post('/api/user/items/', itemDetails);
        setItemList([...itemList, response.data]);
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error adding/updating item:", error);
      alert("Error adding/updating item:", error);
    } finally {
      setLoading({ ...loading, add: false });
      handleClose();
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setItemDetails(itemList[index]);
    setOpen(true);
  };

  const handleDeleteDialogOpen = (index) => {
    setDeleteIndex(index);
    setDeleteDialogOpen(true);
    setItemDetails(itemList[index]);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/api/user/items/${itemDetails.item_code}/`);
      const updatedList = itemList.filter((_, i) => i !== deleteIndex);
      setItemList(updatedList);
      alert("Company deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
     
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const nextIndex = index + 1;
      if (fieldRefs.current[nextIndex]) {
        fieldRefs.current[nextIndex].focus();
      }
    }
  };

  return (
    <Box sx={{ maxWidth: '100%', padding: 2 }}>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Add Item
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ backgroundColor: '#f9dff5' }}>{editIndex !== null ? 'Edit Item Details' : 'Add Item Details'}</DialogTitle>
        <DialogContent style={{ backgroundColor: '#f9dff5' }}>
          <Paper sx={{ padding: "10px", backgroundColor: "#f9dff5" }} elevation={0}>
            <form>
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Category</InputLabel>
                <Select
                  value={itemDetails.category_name}
                  name="category_name"
                  onChange={handleCategoryChange}
                  label="Category"
                >
                  {Array.isArray(categories) && categories.map((category, index) => (
                    <MenuItem key={category.id} value={category.category_name}>
                      {category.category_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal" required>
  <InputLabel>Sub-Category</InputLabel>
  <Select
    value={itemDetails.sub_category_name}
    name="sub_category_name"
    onChange={handleChange}
    label="Sub-Category"
    disabled={!itemDetails.category_name}
  >
    {Array.isArray(subCategories) && subCategories.map((subCategory) => (
      <MenuItem key={subCategory.id} value={subCategory.name}>
        {subCategory.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

              {Object.keys(itemDetails).filter(field => field !== 'category_name' && field !== 'sub_category_name').map((field, index) => (
                <TextField
                  fullWidth
                  key={field}
                  label={field.replace('_', ' ').toUpperCase()}
                  name={field}
                  value={itemDetails[field]}
                  onChange={handleChange}
                  margin="normal"
                  inputRef={el => (fieldRefs.current[index] = el)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  type={['unit_price', 'stock_quantity'].includes(field) ? 'number' : 'text'}
                />
              ))}
            </form>
          </Paper>
        </DialogContent>
        <DialogActions style={{ backgroundColor: '#f9dff5' }}>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleAddOrUpdate} color="secondary" disabled={loading.add}>
            {loading.add ? <CircularProgress size={24} /> : editIndex !== null ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this item?</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              {['Item Name', 'Item Code', 'Category', 'Sub-Category', 'HSN Code', 'Unit Price', 'Stock Quantity', 'Description', 'Actions'].map(header => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(itemList) && itemList.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.item_name}</TableCell>
                <TableCell>{item.item_code}</TableCell>
                <TableCell>{item.category_name}</TableCell>
                <TableCell>{item.sub_category_name}</TableCell>
                <TableCell>{item.hsn_code}</TableCell>
                <TableCell>{item.unit_price}</TableCell>
                <TableCell>{item.stock_quantity}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <IconButton color="secondary" onClick={() => handleEdit(index)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteDialogOpen(index)}>
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
