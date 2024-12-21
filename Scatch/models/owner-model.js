const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  fullName: String,
  emai: String,
  password: String,
  products: {
    type: Array,
    default: [],
  },
  picture: String,
  gstin: String,
});

module.exports = mongoose.model("owner", ownerSchema);
