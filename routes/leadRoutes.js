const express = require("express");
const router = express.Router();
const {
  getLeads,
  getLead,
  createLead,
  updateLead,
  deleteLead,
  addComment,
} = require("../controllers/leadController");
const { protect } = require("../middleware/authMiddleware"); // ✅ New

router.get("/", protect, getLeads);           // ✅ protected
router.get("/:id", protect, getLead);         // ✅ protected
router.post("/", protect, createLead);        // ✅ protected
router.patch("/:id", protect, updateLead);    // ✅ protected
router.delete("/:id", protect, deleteLead);   // ✅ protected
router.post("/:id/comments", protect, addComment); // ✅ protected

module.exports = router;