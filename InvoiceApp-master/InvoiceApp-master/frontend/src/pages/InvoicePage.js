import React, { useState } from "react";
import { Invoice } from "../componants/Invoice/Invoice";
import { InvoiceCustomerDetails } from "../componants/Invoice/InvoiceCustomerDetails";
import { InvoiceAddItem } from "../componants/Invoice/InvoiceAddItem";
import { InvoiceContex } from "../contex/InvoiceContex";
import { TopicBar } from "../componants/TopicBar";

export const InvoicePage = () => {
  const [InvoiceNumber, setInvoiceNumber] = useState("");
  const [refresh, setRefresh] = useState(0);
  return (
    <div className="right-side">
      <TopicBar text="Invoice" />
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
