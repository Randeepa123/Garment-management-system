import React from 'react'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";


function DeleteButton({id,deleteOrder}) {
  return (
    <>
        <IconButton color="secondary" aria-label="delete" component="span"
        onClick={() => {
            Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              deleteOrder(id)
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
        }}>
          <DeleteIcon />
        </IconButton>
    </>
  )
}

export default DeleteButton