const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  permissions: {
    read: { type: Boolean, default: false },
    insert: { type: Boolean, default: false },
    update: { type: Boolean, default: false },
    delete: { type: Boolean, default: false }
  }
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
