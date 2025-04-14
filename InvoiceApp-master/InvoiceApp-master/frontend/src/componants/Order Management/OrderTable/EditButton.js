import React from 'react'
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { BrowserRouter as Router, Routes, Route,Link, useNavigate } from "react-router-dom";

function EditButton({Id}) { 
const navigate = useNavigate();

const handleEditOrder = () => {
    console.log("Edit Order: ", Id);
    navigate("/updateOrder",{state: {Id}});
  }
  return (
    <>
        <IconButton color="primary" aria-label="edit" component="span"
        onClick={handleEditOrder}>
            <EditIcon />
        </IconButton>
    </>
  )
}

export default EditButton