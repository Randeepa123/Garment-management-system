import { React, useContext, useEffect, useState, useRef } from "react";
import logo from "../../asserts/img/logo.png";
import { InvoiceContex } from "../../contex/InvoiceContex";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Box,
  Typography,
  Grid,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

export const Invoice = ({ setEditingItem }) => {
  const { InvoiceNumber, refresh } = useContext(InvoiceContex);
  const invoiceRef = useRef();

  const [invoice, setInvoice] = useState({});
  const [customerDetails, setCustomerDetails] = useState();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const formatDate = (date) => {
    return new Date(date)
      .toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      })
      .replace(",", ".");
  };

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/invoice/getInvoice?invoiceId=${InvoiceNumber}`
        );
        setInvoice(response.data);
        setItems(response.data.items || []);
        setCustomerDetails(response.data.customerId);
        setTotal(response.data.totalAmount || 0);
      } catch (error) {
        console.error("Error fetching Invoice:", error);
      }
    };

    fetchInvoice();
  }, [refresh, InvoiceNumber]);

  useEffect(() => {
    const newTotal = items.reduce((sum, item) => sum + item.total, 0);
    setTotal(newTotal);
  }, [items]);

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8070/invoice/deleteItem?invoiceId=${InvoiceNumber}&itemId=${id}`
      );
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  //download invoice
  const handleDownload = () => {
    const input = invoiceRef.current;
    const buttons = document.querySelectorAll("button");

   
    buttons.forEach((btn) => (btn.style.display = "none"));

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "px", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");

      buttons.forEach((btn) => (btn.style.display = "block"));
    });
  };

  return (
    
      <Box ref={invoiceRef} 
      sx={{
        p: 4,
        border: "1px solid black", 
        borderRadius: 2,           
      }}
      >
        {/* Header Section */}
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <img src={logo} alt="Logo" style={{ maxWidth: 150 }} />
          </Grid>
          <Grid item>
            <Box>
              <Typography variant="h6">
                Invoice#: <strong>{InvoiceNumber ? `T${InvoiceNumber}` : ""}</strong>
              </Typography>
              <Typography variant="h6">
                DATE: <strong>{formatDate(new Date())}</strong>
              </Typography>
            </Box>
          </Grid>
        </Grid>
  
        {/* From / To Section */}
        <Grid container spacing={5} mt={5}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">From</Typography>
            <Typography>Taycantech</Typography>
            <Typography>info@taycantech.com</Typography>
            <Typography>+94 77 122 5553</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">To</Typography>
            <Typography>{customerDetails?.name || "Customer Name"}</Typography>
            <Typography>{customerDetails?.email || "Customer email"}</Typography>
            <Typography>{customerDetails?.phone || "Customer phone"}</Typography>
          </Grid>
        </Grid>
  
        {/* Table Section */}
        <Paper elevation={2} sx={{ mt: 5 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Service</TableCell>
                <TableCell>Cost</TableCell>
                <TableCell>QTY</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length > 0 ? (
                items.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.product}</TableCell>
                    <TableCell>LKR {item.price}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>LKR {item.Discount}</TableCell>
                    <TableCell>LKR {item.total}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => setEditingItem(item)}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteItem(item._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No items found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
  
        {/* Total Section */}
        <Box display="flex" justifyContent="flex-end" mt={4} pr={5}>
          <Typography variant="h6" sx={{ mr: 2 }}>
            Total:
          </Typography>
          <Typography variant="h6">LKR {total}</Typography>
        </Box>
  
        {/* Terms & Download Button */}
        <Box mt={5} textAlign="center">
          <Typography variant="subtitle1" gutterBottom>
            TERMS & CONDITIONS
          </Typography>
          <Button variant="contained" color="primary" onClick={handleDownload}>
            Download
          </Button>
        </Box>
      </Box>
    );
};
