//@external model
const mongoose = require('mongoose');

const divisionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

//@exports
module.exports = mongoose.model('division', divisionSchema);

