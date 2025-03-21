import React from 'react'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteButton({id,deleteOrder}) {
  return (
    <>
        <IconButton color="secondary" aria-label="delete" component="span"
        onClick={() => deleteOrder(id)}>
          <DeleteIcon />
        </IconButton>
    </>
  )
}

export default DeleteButton