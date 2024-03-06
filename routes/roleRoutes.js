const express = require('express');
const router = express.Router();
const { Snowflake } = require("@theinternetfolks/snowflake");
const Role = require('../models/Role');

// Route to create a new role
router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;
    const roleId = Snowflake.generate(); // Generate unique Snowflake ID
    const role = await Role.create({ id: roleId, name });
    res.status(201).json({ success: true, data: role });
  } catch (error) {
    next(error);
  }
});

// Route to get all roles
router.get('/', async (req, res, next) => {
  try {
    const roles = await Role.find();
    res.status(200).json({ success: true, data: roles });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
