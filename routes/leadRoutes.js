const express = require('express')
const router = express.Router()
const {
  getLeads,
  getLead,
  createLead,
  updateLead,
  deleteLead,
  addComment
} = require('../controllers/leadController')

router.get('/', getLeads)
router.get('/:id', getLead)
router.post('/', createLead)
router.patch('/:id', updateLead)
router.delete('/:id', deleteLead)
router.post('/:id/comments', addComment)

module.exports = router