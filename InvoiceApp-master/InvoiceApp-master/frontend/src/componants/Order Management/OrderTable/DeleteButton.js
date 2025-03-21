import React from 'react'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteButton() {
  return (
    <>
        <IconButton color="secondary" aria-label="delete" component="span">
            <DeleteIcon />
        </IconButton>
    </>
  )
}

export default DeleteButton