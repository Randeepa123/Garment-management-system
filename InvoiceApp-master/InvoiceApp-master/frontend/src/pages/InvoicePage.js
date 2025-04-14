import React, { useState } from "react";
import { Invoice } from "../componants/Invoice/Invoice";
import { InvoiceCustomerDetails } from "../componants/Invoice/InvoiceCustomerDetails";
import { InvoiceAddItem } from "../componants/Invoice/InvoiceAddItem";
import { InvoiceContex } from "../contex/InvoiceContex";
import { TopicBar } from "../componants/TopicBar";

export const InvoicePage = () => {
  const [InvoiceNumber, setInvoiceNumber] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [editingItem, setEditingItem] = useState(null);

  return (
    <div className="right-side">
      <TopicBar text="Invoice" />
      <InvoiceContex.Provider
        value={{ InvoiceNumber, setInvoiceNumber, refresh, setRefresh }}
      >
        <InvoiceCustomerDetails />
        <div className="row mt-3 d-flex">
          <div className="col-7 p-4">
            <Invoice setEditingItem={setEditingItem} />
          </div>
          <div className="col-5 p-4">
            <InvoiceAddItem
              editingItem={editingItem}
              setEditingItem={setEditingItem}
            />
          </div>
        </div>
      </InvoiceContex.Provider>
    </div>
  );
};
