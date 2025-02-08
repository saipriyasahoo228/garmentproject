
import React, { useState, useEffect, useRef } from 'react';
import {
  TextField, Button, Box, CircularProgress, Dialog, DialogActions, DialogContent,
  DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, IconButton, DialogContentText
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import api from "../../../api";

export default function SimplePaper() {
  const [categoryDetails, setCategoryDetails] = useState({
    category_name: '',
    category_code: '',
    sub_category_name: {},
    description: '',
  });

  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState({ add: false, fetch: true });
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const nameRef = useRef(null);
  const codeRef = useRef(null);
  const subCategoryRef = useRef(null);
  const descriptionRef = useRef(null);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/user/categories/');
        const dataDict = response.data.reduce((acc, category) => {
          acc[category.category_code] = {
            ...category,
            sub_category_name: category.sub_category_name.map((sub_category_name) => ({ sub_category_name })), // Transform into object format
          };
          return acc;
        }, {});
        // alert(response.data.message);
        setCategoryList(dataDict);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading((prevLoading) => ({ ...prevLoading, fetch: false }));
      }
    };
  
    fetchData();
  }, []);


  const handleChange = (e) => {
    setCategoryDetails({
      ...categoryDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
    setEditIndex(null);
    setCategoryDetails({
      category_name: '',
      category_code: '',
      sub_category_name: '',
      description: '',
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (index) => {
    const category = categoryList[index];
    setCategoryDetails({
      ...category,
      sub_category_name: category.sub_category_name.join(', '), // Convert array to comma-separated string for editing
    });
    setEditIndex(index);
    setOpen(true);
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    setLoading((prevLoading) => ({ ...prevLoading, add: true }));
  
    const payload = {
      ...categoryDetails,
      sub_category_name: categoryDetails.sub_category_name.split(',').map((name) => ({ name: name.trim() })), // Convert to object format
    };
  
    try {
      if (editIndex !== null) {
        // Update existing category
        const response = await api.put(`/api/user/categories/${categoryDetails.category_name}/`, payload);
        setCategoryList((prevList) => ({
          ...prevList,
          [categoryDetails.category_code]: response.data.data,
        }));
        alert(response.data.message);
        setEditIndex(null);
      } else {
        // Add new category
        const response = await api.post('/api/user/categories/', payload);
        setCategoryList((prevList) => ({
          ...prevList,
          [response.data.data.category_code]: response.data.data,
        }));
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error saving category:', error);
    } finally {
      setLoading((prevLoading) => ({ ...prevLoading, add: false }));
      setCategoryDetails({
        category_name: '',
        category_code: '',
        sub_category_name: '',
        description: '',
      });
      setOpen(false);
    }
  };
  

  const handleDelete = (index) => {
    setDeleteDialogOpen(true);
    setDeleteIndex(index);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/api/user/categories/${categoryList[deleteIndex].category_name}/`);
      const updatedList = categoryList.filter((_, i) => i !== deleteIndex);
      setCategoryList(updatedList);
      alert("Category deleted successfully!");
    } catch (error) {
      console.error('Error deleting category:', error);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === 'Enter' && nextRef.current) {
      e.preventDefault();
      nextRef.current.focus();
    }
  };

  return (
    <Box sx={{ maxWidth: '100%', padding: 2 }}>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        {editIndex !== null ? 'Edit Category' : 'Add Category'}
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIndex !== null ? 'Edit Category Details' : 'Add Category Details'}</DialogTitle>
        <DialogContent>
          <Paper sx={{ padding: "10px" }} elevation={0}>
            <form>
              <TextField
                fullWidth
                label="Category Name"
                name="category_name"
                value={categoryDetails.category_name}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, codeRef)}
                inputRef={nameRef}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Category Code"
                name="category_code"
                value={categoryDetails.category_code}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, subCategoryRef)}
                inputRef={codeRef}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Sub-Category Names "
                name="sub_category_name"
                value={categoryDetails.sub_category_name}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, descriptionRef)}
                inputRef={subCategoryRef}
                margin="normal"
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={categoryDetails.description}
                onChange={handleChange}
                inputRef={descriptionRef}
                margin="normal"
              />
            </form>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleAddOrUpdate} color="secondary" disabled={loading.add}>
            {loading.add ? <CircularProgress size={24} /> : editIndex !== null ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {loading.fetch ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category Name</TableCell>
                <TableCell>Category Code</TableCell>
                <TableCell>Sub-Category Names</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {Object.values(categoryList).map((category) => (
     
    <TableRow key={category.category_code}>
      <TableCell>{category.category_name}</TableCell>
      <TableCell>{category.category_code}</TableCell>

<TableCell style={{ width: '350px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
  {Array.isArray(category.sub_category_name) && category.sub_category_name.length > 0
    ? category.sub_category_name
        .map((sub) => sub?.sub_category_name?.name || "Unnamed Subcategory") // Safely access `name`
        .join(", ")
    : "No Subcategories"}
</TableCell>




      


      <TableCell>{category.description}</TableCell>
      <TableCell>
        <IconButton color="secondary" onClick={() => handleEdit(category.category_code)}>
          <Edit />
        </IconButton>
        <IconButton color="error" onClick={() => handleDelete(category.category_code)}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
     
  ))}
</TableBody>


          </Table>
        </TableContainer>
      )}

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this category?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}





