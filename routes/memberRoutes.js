// memberRoutes.js

const express = require('express');
const router = express.Router();
const { Snowflake } = require("@theinternetfolks/snowflake");
const Member = require('../models/Member');

// Route to add a member to a community
router.post('/', async (req, res, next) => {
  try {
    const { community, user, role } = req.body;
    
    // Check if the user is allowed to add a member
    // Implement your authorization logic here
    const isAllowed = true; 
    
    if (!isAllowed) {
      return res.status(403).json({ success: false, message: "User is not allowed to add members" });
    }

    const memberId = Snowflake.generate(); 
    const member = await Member.create({ id: memberId, community, user, role });
    res.status(201).json({ success: true, data: member });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const memberId = req.params.id;
    

    const isAllowed = true; // Example authorization check
    
    if (!isAllowed) {
      return res.status(403).json({ success: false, message: "User is not allowed to remove members" });
    }

    // Remove member from the database based on the provided ID
    await Member.findByIdAndRemove(memberId);
    res.status(200).json({ success: true, message: "Member removed successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
