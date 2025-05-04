const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const refundSchema = new Schema({
    RefundID : {
        type : String
    },

    CustomerID : {
        type : String,
        required: true
    },

    OrderID : {
        type : String,
        required: true
    },

    RequestedDate : {
        type : Date,
        required: true
    },

    Quantity : {
        type : Number,
        required: true
    },

    Amount_LKR : {
        type : Number,
        required: true
    }
})

const Refund = mongoose.model("Refund", refundSchema);

module.exports = Refund;