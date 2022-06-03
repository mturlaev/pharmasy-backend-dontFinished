const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
    name: String,
    hasRecept: Boolean,
    wallet: Number
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;