//@external module
const { mongoose, Schema } = require('mongoose');

const districtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  divisionId: {
    type: Schema.ObjectId,
    ref: 'division',
    required: true,
  },
});

//@exports
module.exports = mongoose.model('district', districtSchema);
