const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnvelopeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('Envelope', EnvelopeSchema);
