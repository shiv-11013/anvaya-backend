const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const leadRoutes = require("./routes/leadRoutes"); 
const agentRoutes = require("./routes/agentRoutes"); 

const app = express();

dotenv.config();


connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://anvaya-frontend-ejbqebbic-shivs-projects-5cdfdbed.vercel.app",
    ],
    credentials: true,
  })
);





app.use(cors());
app.use(express.json());


app.use("/api/leads", leadRoutes);
app.use("/api/agents", agentRoutes);


app.get("/", (req, res) => {
  res.json({ message: "Anvaya CRM API is running!" });
});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
