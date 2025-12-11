const Agent = require('../models/Agent')

// @desc    Get all agents
// @route   GET /api/agents
const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find()
    res.json(agents)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Create new agent
// @route   POST /api/agents
const createAgent = async (req, res) => {
  try {
    const { name, email } = req.body

    // Check if agent exists
    const agentExists = await Agent.findOne({ email })
    if (agentExists) {
      return res.status(400).json({ message: 'Agent already exists' })
    }

    const agent = await Agent.create({ name, email })
    res.status(201).json(agent)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getAgents, createAgent }