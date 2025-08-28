import express from "express"
import connectDB from "./config/db.js";
import dotenv from "dotenv"
import router from "./routes/authroutes.js";
import bodyParser from "body-parser";
import receiperouter from "./routes/receiperoutes.js";
import cors from "cors";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

app.use(bodyParser.json());
app.use(cors());
app.use("/api/v1",router,receiperouter);
// app.use("/api/v2",receiperouter);

app.get("/",(req, res)=>{
    res.json({
        success:true,
        message:"Server working perfectly"
    });
})

app.get("/common",(req, res)=>{
    res.send("hello ji");
});

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});
