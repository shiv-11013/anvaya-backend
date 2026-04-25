require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const leadRoutes = require("./routes/leadRoutes");
const agentRoutes = require("./routes/agentRoutes");
const authRoutes = require("./routes/authRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://anvaya-frontend-ejbqebbic-shivs-projects-5cdfdbed.vercel.app",
      "https://anvaya-frontend-2qg1t4b2b-shivs-projects-5cdfdbed.vercel.app",
      "https://anvaya-frontend-zeta.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/agents", agentRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Anvaya CRM API is running!" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});