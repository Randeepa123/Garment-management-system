import React, { useState } from "react";
import { Invoice } from "../componants/Invoice/Invoice";
import { InvoiceCustomerDetails } from "../componants/Invoice/InvoiceCustomerDetails";
import { InvoiceAddItem } from "../componants/Invoice/InvoiceAddItem";
import { InvoiceContex } from "../contex/InvoiceContex";

//icons
import SettingsIcon from "@mui/icons-material/Settings";
import Person4Icon from "@mui/icons-material/Person4";
//ui componants
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import NotificationsIcon from "@mui/icons-material/Notifications";
function CircleIconBox({ icon, color = "white" }) {
  return (
    <Box
      sx={{
        backgroundColor: "#007ea4",
        width: 40,
        height: 40,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {icon}
    </Box>
  );
}

export const InvoicePage = () => {
  const [InvoiceNumber, setInvoiceNumber] = useState("");
  const [refresh, setRefresh] = useState(0);
  return (
    <div className="right-side">
      <div className="d-flex justify-content-between top-heading m-4">
        <h2>Invoice</h2>
        <div className="d-flex gap-3">
          <CircleIconBox icon={<SettingsIcon sx={{ color: "white" }} />} />
          <CircleIconBox icon={<NotificationsIcon sx={{ color: "white" }} />} />
          <Divider orientation="vertical" flexItem sx={{ height: 40 }} />
          <CircleIconBox icon={<Person4Icon sx={{ color: "white" }} />} />
          <span className=" align-self-center ">Adithya Hulangamuwa</span>
        </div>
      </div>
      <InvoiceContex.Provider
        value={{ InvoiceNumber, setInvoiceNumber, refresh, setRefresh }}
      >
        <InvoiceCustomerDetails />
        <div className="row mt-3 d-flex">
          <div class="col-7 p-4">
            <Invoice />
          </div>
          <div class="col-5 p-4">
            <InvoiceAddItem />
          </div>
        </div>
      </InvoiceContex.Provider>
    </div>
  );
};
