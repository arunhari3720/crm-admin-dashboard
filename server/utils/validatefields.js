const field = require("../models/fieldconfigmodel");

const validatefields = async (data, role) => {
  const fieldconfigs = await field.find();

  const fieldmap = {};
  fieldconfigs.forEach((f) => {
    fieldmap[f.field] = f.roles;
  });

  for (let key in data) {
    if (!fieldmap[key]) {
      return { valid: false, message: `invalid field: ${key}` };
    }

    if (!fieldmap[key][role]) {
      return { valid: false, message: `unauthorized field: ${key}` };
    }
  }

  return { valid: true };
};

module.exports = validatefields;