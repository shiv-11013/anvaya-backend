const express = require("express");
const router = express.Router();
const { getAgents, createAgent } = require("../controllers/agentController");
const { protect } = require("../middleware/authMiddleware"); // ✅ New

router.get("/", protect, getAgents);    // ✅ protected
router.post("/", protect, createAgent); // ✅ protected

module.exports = router;