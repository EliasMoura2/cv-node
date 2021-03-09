const { Schema, model } = require('mongoose');

const contactSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: [true, 'email is required']
  },
},{
  timestamps: true
})

module.exports = model('Contact', contactSchema)